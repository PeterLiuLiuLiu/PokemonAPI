import Layout from "../../components/Layouts";
import { useRouter } from "next/router";

export default function PokemonDetail(pokemon) {
	const router = useRouter();
	const clickHomeHandler = () => {
		router.push("/");
	};

	const types = pokemon.types.map((type) => type.type.name);
	console.log(types);
	return (
		<Layout title={`${pokemon.id}. ${pokemon.name}`}>
			<h1>{`${pokemon.id}. ${pokemon.name}`}</h1>
			<div className="container text-center bg-slate-50 p-5 flex flex-col items-center">
				<img className="w-[400px]" src={pokemon.image} alt={pokemon.name} />
				<span className="text-xl font-bold">Weight: </span>
				<span>{pokemon.weight}</span>
				<br />
				<span className="text-xl font-bold">Height: </span>
				<span>{pokemon.height}</span>
				<p className="text-3xl pt-10">Type:</p>
				{types.map((type) => (
					<p key={pokemon.id}>{type}</p>
				))}
				<button
					onClick={clickHomeHandler}
					className="bg-blue-400 item- rounded-md text-white font-bold px-4 py-2 mt-5 hover:bg-blue-600"
				>
					Home
				</button>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	let pokemon = {};
	let image = "";
	let id = -1;
	try {
		id = context.query.pokemonId;
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
		pokemon = await response.json();
		const imageId = "00" + id.toString();
		image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId.slice(
			-3
		)}.png`;
	} catch (err) {
		console.error(err);
	}
	return {
		props: { ...pokemon, image, id },
	};
}
