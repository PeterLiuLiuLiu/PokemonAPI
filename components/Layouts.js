import React from "react";
import Head from "next/Head";

export default function Layout(props) {
	return (
		<div className="bg-red-200">
			<Head>
				<title>{props.title}</title>
			</Head>
			<main className="container bg-slate-200 text-xl max-w-xl mx-auto h-screen">
				{props.children}
			</main>
		</div>
	);
}
