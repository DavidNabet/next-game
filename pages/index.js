import Image from "next/image";
import Link from "next/link";

// https://zelda-backend.herokuapp.com/interface/62687554b43251620aed8f60

export default function Home({ characters }) {
  const charactersGrid = {
    container:
      "group h-96 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4",
    image:
      "w-full h-full object-contain object-center absolute inset-0 group-hover:scale-110 transition duration-200",
    inner: "w-full flex flex-col bg-white text-center rounded-lg relative p-4",
    title: "text-gray-500",
    description: "text-gray-800 text-lg lg:text-xl font-bold",
  };
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12">
          HomePage
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {!!characters &&
            characters?.map((character) => (
              <div key={character._id}>
                <Link href={`/${character._id}`}>
                  <a className={charactersGrid.container}>
                    <Image
                      alt={`character ${character._id}`}
                      src={character?.logo.secure_url}
                      className={charactersGrid.image}
                      loading="lazy"
                      layout="fill"
                    />
                    <div className={charactersGrid.inner}>
                      <span className={charactersGrid.title}>
                        {character.title}
                      </span>
                      <span className={charactersGrid.description}>
                        {character.description}
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_GAME}/interface`);
  const { data } = await res.json();

  if (!data) return { notFound: true };

  return {
    props: {
      characters: data,
    },
  };
};
