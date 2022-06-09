import { Container, Grid, styled, Typography } from "@mui/material";
import { Box } from "@mui/material";
import DGButton from "./components/DGButton";
import DGTypography from "./components/DGTypography";
import NavBar from "./components/NavBar";
import SocialPanel from "./components/SocialPanel";
import WalletButton from "./components/WalletButton";
import { degenMintNft } from "./contracts/nft";
import { useWallet } from "./context/wallet";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getGeneral, RefreshGeneral } from "./redux/nft";
import { textAlign } from "@mui/system";
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

const Title = styled(Typography)(() => {
  return {
    fontFamily: "Rubik Glitch",
    textAlign: "center",
    fontSize: "56px",
  };
});

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
// function App() {
//   const wallet = useWallet();
//   const degenInfo = useSelector(getGeneral);

//   const handleMint = useCallback(async () => {
//     console.log("[MINT] Mint button clicked.");
//     degenMintNft(wallet.provider, wallet.account, degenInfo.mintPrice, 1);
//   }, [wallet.provider, wallet.account]);

//   return (
//     <>
//       <NavBar
//         logo={{ image: "logo.png", link: "#" }}
//         components={[<SocialPanel data={socials} />, <WalletButton />]}
//       />
//       <Container sx={{ backgroundImage: "url(images/background.png)" }}>
//         <Title>DEGENs Rock</Title>
//         <DGTypography>
//           3333 DEGENs Holding the Bear Market as Rocks. Free Airdrop to OG
//           Rocks. Free mint for first half. Zero Royalties!!! This is a tribute
//           collection to every DEGEN who held their ground as Rocks during a
//           sustained bear Market. Keep Rocking and Winning!!!
//         </DGTypography>
//         <Grid container flexDirection="row" spacing={1}>
//           <Grid
//             item
//             xs={5}
//             container
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Box component="img" src="images/first.gif" width="80%" />
//           </Grid>
//           <Grid
//             item
//             xs={2}
//             container
//             flexDirection="column"
//             justifyContent="end"
//             alignItems="center"
//             pb={3}
//           >
//             {wallet.account ? (
//               <DGButton onClick={handleMint} sx={{ width: "80%" }}>
//                 Mint
//               </DGButton>
//             ) : (
//               <WalletButton />
//             )}
//           </Grid>
//           <Grid
//             item
//             xs={5}
//             container
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Box component="img" src="images/second.gif" width="80%" />
//           </Grid>
//         </Grid>
//         <DGTypography textAlign="center">
//           {degenInfo.totalSupply}/{degenInfo.maxSupply} Minted
//         </DGTypography>
//       </Container>
//     </>
//   );
// }

export default App;
