import NavBar from "./components/NavBar";
import SocialPanel from "./components/SocialPanel";
import WalletButton from "./components/WalletButton";
import Main from "./pages/main";

const socials = [
  {
    image: "images/twitter.svg",
    link: "https://twitter.com/RocksDegen",
  },
  {
    image: "images/opensea.svg",
    link: "https://opensea.io/collection/degensrock",
  },
];

function App() {
  return (
    <>
      <NavBar
        logo={{ image: "logo.png", link: "#" }}
        components={[<SocialPanel data={socials} />, <WalletButton />]}
      />
      <Main />
    </>
  );
}

export default App;
