import React, { useState } from "react";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";

const useLoader = (defaultState = false) => {
  const [isLoading, setIsLoading] = useState(defaultState);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const LoaderComponent = () =>
    isLoading ? (
      <Dialog
        open
        sx={{
          "& .MuiDialog-paper": {
            background: "none",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    ) : (
      <></>
    );

  return { showLoader, hideLoader, LoaderComponent, isLoading };
};

export default useLoader;
