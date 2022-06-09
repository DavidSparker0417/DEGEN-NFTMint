import { useSelector } from "react-redux";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DGButton from "../../../components/DGButton";
import WalletButton from "../../../components/WalletButton";
import { useWallet } from "../../../context/wallet";
import { degenMintNft } from "../../../contracts/nft";
import { getGeneral } from "../../../redux/nft";
import DGTypography from "../../../components/DGTypography";
import { useUI } from "../../../context/ui";
import { TARGET_NET } from "../../../config/config";
import { toast } from "react-toastify";
import DGInput from "../../../components/DGInput";
import { dsBnWeiToEth, dsErrMsgGet } from "../../../ds-lib/ds-web3";

function NFTCard({ image, ...rest }) {
  return (
    <Grid item container alignItems="center" justifyContent="center" {...rest}>
      <Box
        component="img"
        src={image}
        width="100%"
        sx={{
          borderRadius: "20px",
          border: "solid 2px #123b4b"
        }}
      />
    </Grid>
  );
}

function DetailPanel() {
  const degenInfo = useSelector(getGeneral);
  
  function PhaseInfo({name, phase}) {
    const cost = phase.cost === "0" ? "Free" : dsBnWeiToEth(phase.cost);
    const bkColor = phase.active ? "#91c1c6" : "transparent";
    return (
      <Typography
        pb={1}
        fontSize="1.2rem"
        fontWeight="bold"
        sx={{ 
          color: "#1e09aa",
          backgroundColor: bkColor,
          padding: "8px",
          borderRadius: "16px"
        }}
      >
        {name}: {cost} <br />
        Max Trx: {phase.maxPerTrx} per wallet <br />
      </Typography>
    );
  }

  return (
    <Box>
      <PhaseInfo name="Phase 1" phase={degenInfo.phase1}/>
      <PhaseInfo name="Phase 2" phase={degenInfo.phase2}/>
    </Box>
  );
}

function MintController({ disabled }) {
  const wallet = useWallet();
  const [count, setCount] = useState("1");
  const { setLoading } = useUI();
  const { mintPrice, maxMintPerWallet } = useSelector(getGeneral);

  function handleChangeCount({ target }) {
    setCount(target.value);
  }

  const handleMint = async () => {
    try {
      setLoading(true, "Minting ...");
      await degenMintNft(wallet.provider, wallet.account, mintPrice, count);
      setLoading(false);
      toast.success("Successfully minted!");
    } catch (e) {
      setLoading(false);
      toast.error(dsErrMsgGet(e.message));
    }
  };

  return (
    <>
      <DGInput
        type="number"
        sx={{ marginBottom: "8px" }}
        inputProps={{
          min: 1,
          max: maxMintPerWallet,
        }}
        disabled={disabled}
        value={count}
        onChange={handleChangeCount}
      />
      <DGButton onClick={handleMint} disabled={disabled} sx={{ width: "80%" }}>
        Mint
      </DGButton>
    </>
  );
}

function MintControlPanel({ ...rest }) {
  const wallet = useWallet();

  return (
    <Grid
      item
      container
      flexDirection="column"
      justifyContent="end"
      alignItems="center"
      pb={3}
      {...rest}
    >
      <Box mb={1}>
        {wallet.isValidNet() ? (
          <DetailPanel />
        ) : (
          <Typography color="error" textAlign="center">
            Please turn into valid network. ({TARGET_NET.chainName})
          </Typography>
        )}
      </Box>
      {wallet.account ? (
        <MintController disabled={!wallet.isValidNet()} />
      ) : (
        <WalletButton />
      )}
    </Grid>
  );
}

export default function MintPanel({ ...rest }) {
  const degenInfo = useSelector(getGeneral);
  return (
    <Box {...rest}>
      <Grid container flexDirection="row" spacing={1}>
        <NFTCard image="images/first.gif" xs={4} />
        <MintControlPanel xs={4} />
        <NFTCard image="images/second.gif" xs={4} />
      </Grid>
      <DGTypography textAlign="center">
        {degenInfo.totalSupply}/{degenInfo.maxSupply} Minted
      </DGTypography>
    </Box>
  );
}
