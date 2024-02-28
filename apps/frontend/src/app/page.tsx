import CustomLink from "@/components/ui/customLink";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-5xl pt-52">
      Welcome to Simple blog!
      <CustomLink href="/article" className="text-xl font-thin italic">
        Click here for showing all articles
      </CustomLink>
    </div>
  );
};

export default Home;
