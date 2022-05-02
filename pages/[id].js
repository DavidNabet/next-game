// https://zelda-backend.herokuapp.com/interface/62687554b43251620aed8f60
import Image from "next/image";
import { useRouter } from "next/router";

const CharacterDetails = ({ character }) => {
  const router = useRouter();
  const dataGrid = {
    container:
      "overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto",
    url: "w-full relative h-full",
    source: "max-h-40 w-full",
    inner: "bg-white dark:bg-gray-800 w-full p-4",
    year: "text-indigo-500 text-md font-medium",
    title: "text-gray-800 dark:text-white text-xl font-medium mb-2",
    country: "text-gray-400 dark:text-gray-300 font-light text-sm",
  };

  const details = character.game_ref;
  const figurines = character?.figurines;
  return (
    <div className="w-full max-w-3 xl mx-auto py-16 px-8">
      {/* <pre>{JSON.stringify(character, null, 2)}</pre> */}
      <div className="flex items-center my-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-indigo-500 rounded-md text-white px-4 py-2 mr-8"
        >
          {"< Retour"}
        </button>
        <a href="#" className="block relative">
          <Image
            src={details?.logo.secure_url}
            alt="logo"
            className="mx-auto object-contain rounded-full"
            loading="lazy"
            width={80}
            height={80}
          />
        </a>
        <div className="flex flex-col justify-between ml-8 text-sm">
          <h1 className="text-3xl mb-2">{details?.title}</h1>
          <p>{details?.description}</p>
        </div>
      </div>
      <hr />
      {figurines.length > 0 && (
        <div className="bg-gray-100 p-6">
          <h3 className="text-xl mb-8">Figurines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {figurines?.map((figurine) => (
              <div key={figurine.index} className={dataGrid.container}>
                <a href="#" className={dataGrid.url}>
                  <Image
                    alt={`figurine ${figurine.index}`}
                    src={figurine.secure_url}
                    className={dataGrid.source}
                    loading="lazy"
                    width={320}
                    height={213}
                    objectFit="cover"
                  />
                  <div className={dataGrid.inner}>
                    <p className={dataGrid.year}>{figurine.year}</p>
                    <p className={dataGrid.title}>{figurine.title}</p>
                    <p className={dataGrid.country}>{figurine.country}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_GAME}/interface`);
  const { data } = await res.json();

  const paths = data?.map((character) => ({
    params: { id: character._id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const res =
    await fetch(`${process.env.NEXT_PUBLIC_API_GAME}/interface/${params.id}
      `);
  const { data } = await res.json();

  // map
  const character = data[0];

  return {
    props: {
      character,
    },
  };
};

export default CharacterDetails;
