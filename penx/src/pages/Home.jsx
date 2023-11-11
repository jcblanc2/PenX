import NavBar from "../components/NavBar";
import Article from "../components/Article";

const Home = () => {
    return (
        <main className="p-2 my-0 mx-auto max-w-[700px]">
            <NavBar writing={false} />

            <Article />
        </main>
    )
}

export default Home