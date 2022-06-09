import { Container } from "@mui/material";
import DGTypography from "../../components/DGTypography";
import { Title } from "./sections/Title";
import MintPanel from "./sections/MintPanel";

export default function Main() {
  return (
    <>
      <Container 
        sx={{ 
          // backgroundImage: "url(images/background.png)",
          backgroundSize: "cover",
          height: "100%"
        }}
      >
        <Title>DEGENs Rock</Title>
        <DGTypography px={3}>
          3333 DEGENs Holding the Bear Market as Rocks. Free Airdrop to OG
          Rocks. Free mint for first half. Zero Royalties!!! This is a tribute
          collection to every DEGEN who held their ground as Rocks during a
          sustained bear Market. Keep Rocking and Winning!!!
        </DGTypography>
        <MintPanel mt={2}/>
      </Container>
    </>
  );
}
