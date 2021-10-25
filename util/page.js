import fs from "fs";
import matter from "gray-matter";
import mapValues from "lodash/mapValues";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import { NoteMeta } from "../types";

const NOTES_DATA_PATH = path.join(process.cwd(), "noteData");

const getAllComponentsFiles = () =>
    mapValues(allComponentFilepaths, (filepath) =>
        fs.readFileSync(path.join(process.cwd(), filepath)).toString()
    );

const getSourceOfFile = (fileName) =>
    fs.readFileSync(path.join(NOTES_DATA_PATH, fileName));

export const getAllNotes = () => {
    return fs
        .readdirSync(NOTES_DATA_PATH)
        .filter((path) => /\.mdx?$/.test(path))
        .map((fileName) => {
            const filepath = path.join(NOTES_DATA_PATH, fileName);
            const source = fs.readFileSync(filepath);
            const slug = fileName.replace(/\.mdx?$/, "");
            const data = matter(source).data as NoteMeta;

            return {
                frontmatter: {
                    ...data,
                    slug,
                },
                slug,
            };
        });
};

export const getNote = async (slug) => {
    const source = getSourceOfFile(slug + ".mdx");
    const { code, frontmatter, matter } = await bundleMDX(source.toString(), {
        cwd: NOTES_DATA_PATH,
        esbuildOptions(options) {
            // this is needed to prevent importing styled components from breaking everything
            // https://github.com/kentcdodds/mdx-bundler/issues/48
            options.platform = "node";
            options.target = ["es2020"];

            return options;
        },
        files: getAllComponentsFiles(),
    });

    return {
        code,
        frontmatter,
        matter,
    };
};
