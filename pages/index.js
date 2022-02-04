import Layout from "../components/Layouts";
import Link from "next/Link";

const url = "https://pokeapi.co/api/v2/pokemon?limit=20/";

export default function Home({ pokemons }) {
	return (
		<Layout title="Pokemon API">
			<h1>Hello Pokemon!</h1>
			<ul>
				{pokemons.map((pokemon, index) => (
					<li>
						<Link href={`/pokemon/${index + 1}`}>
							<a className="bg-yellow-300 border-2 border-black flex flex-1 items-center mb-5 p-0 hover:drop-shadow-2xl">
								<img
									className="w-[180px] ml-5"
									src={pokemon.image}
									alt={pokemon.name}
								/>
								<span className="text-2xl font-bold text-center pl-4 underline">{`${
									index + 1
								}. ${pokemon.name}`}</span>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</Layout>
	);
}

export async function getStaticProps() {
	let pokemons = [];
	try {
		const response = await fetch(url);
		const { results } = await response.json();
		pokemons = results.map((result, index) => {
			const imageId = "00" + (index + 1).toString();
			const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId.slice(
				-3
			)}.png`;
			return { ...result, image };
		});
	} catch (err) {
		console.error(err);
	}
	return {
		props: { pokemons },
	};
}
