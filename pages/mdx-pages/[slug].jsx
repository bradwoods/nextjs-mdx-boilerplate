const MDX_DATA_DIR = path.join(process.cwd(), 'data');

export const getAllNotes = () => {
  console.log(`here`);
  return fs
    .readdirSync(MDX_DATA_DIR)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const filepath = path.join(NOTES_DATA_PATH, fileName);
      const source = fs.readFileSync(filepath);
      const slug = fileName.replace(/\.mdx?$/, '');
      const data = matter(source).data;

      return {
        frontmatter: {
          ...data,
          slug,
        },
        slug,
      };
    });
};

const MdxPage = ({ code, frontmatter, matter }) => {
  return <div>MdxPagePlaceholder</div>;
};

export const getStaticPaths = async () => {
  const paths = getAllNotes().map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default MdxPage;
