import BrowsePageSearch from "@/components/template/desktop/BrowsePageSearch";

type SearchPageProps = {
  searchParams: {
    q: string;
  };
};

const Search = ({ searchParams }: SearchPageProps) => {
  console.log(searchParams);
  return (
    <>
     
      <BrowsePageSearch QSearch={searchParams.q} />{" "}
    </>
  );
};

export default Search;
