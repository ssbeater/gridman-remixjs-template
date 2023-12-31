/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { createRequestHandler } from "@remix-run/express";
import type { ServerBuild } from "@remix-run/node";
import { broadcastDevReady, installGlobals } from "@remix-run/node";
import type { RequestHandler } from "express";
import express from "express";
import morgan from "morgan";
import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install();
installGlobals();
run();

async function run() {
	const BUILD_PATH = path.resolve("build/index.js");
	const VERSION_PATH = path.resolve("build/version.txt");

	const initialBuild = await reimportServer();
	const remixHandler =
		process.env.NODE_ENV === "development"
			? await createDevRequestHandler(initialBuild)
			: createRequestHandler({
					build: initialBuild,
					mode: initialBuild.mode,
			  });

	const app = express();
	app.disable("x-powered-by");
	app.use("/build", express.static("public/build", { immutable: true, maxAge: "1y" }));

	app.use(express.static("public", { maxAge: "1h" }));
	app.use(morgan("tiny"));
	app.all("*", remixHandler);

	const port = process.env.PORT ?? 3000;

	app.listen(port, async () => {
		console.log(`✅ app ready: http://localhost:${port}`);

		if (process.env.NODE_ENV === "development") {
			broadcastDevReady(initialBuild);
		}
	});

	async function reimportServer(): Promise<ServerBuild> {
		// cjs: manually remove the server build from the require cache
		Object.keys(require.cache).forEach((key) => {
			if (key.startsWith(BUILD_PATH)) {
				delete require.cache[key];
			}
		});

		const stat = fs.statSync(BUILD_PATH);

		// convert build path to URL for Windows compatibility with dynamic `import`
		const BUILD_URL = url.pathToFileURL(BUILD_PATH).href;

		// use a timestamp query parameter to bust the import cache
		return import(`${BUILD_URL}?t=${stat.mtimeMs}`);
	}

	async function createDevRequestHandler(initialBuild: ServerBuild): Promise<RequestHandler> {
		let build = initialBuild;
		async function handleServerUpdate() {
			// 1. re-import the server build
			build = await reimportServer();
			// 2. tell Remix that this app server is now up-to-date and ready
			broadcastDevReady(build);
		}
		const chokidar = await import("chokidar");
		chokidar
			.watch(VERSION_PATH, { ignoreInitial: true })
			.on("add", handleServerUpdate)
			.on("change", handleServerUpdate);

		// wrap request handler to make sure its recreated with the latest build for every request
		return async (req, res, next) => {
			try {
				return createRequestHandler({
					build,
					mode: "development",
				})(req, res, next);
			} catch (error) {
				next(error);
			}
		};
	}
}
