import React, { useState } from "react";
import { Box, Collapse, Image, Skeleton, Tooltip } from "@chakra-ui/react";
import { IGif } from "../types/IGif.ts";
import GifDetail from "./GifDetail.tsx";

const Gif: React.FC<{ gif: IGif }> = ({ gif, ...rest }) => {
  const { url, width, height } = gif;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Box w={width}>
      <Collapse
        in={isOpened}
        transition={{ exit: { duration: 0.25 }, enter: { duration: 0.25 } }}
      >
        <GifDetail w={width} gif={gif} />
      </Collapse>
      <Tooltip
        bg="blue.200"
        label={isOpened ? "Click to close" : "Click to see detail"}
        aria-label="A tooltip"
        hasArrow
        placement="right"
      >
        <Image
          onClick={() => setIsOpened((pre) => !pre)}
          visibility={imageLoaded ? "visible" : "hidden"}
          position={imageLoaded ? "static" : "absolute"}
          top={0}
          left={0}
          src={url}
          w={width}
          h={height}
          borderRadius={10}
          onLoad={() => setImageLoaded(true)}
          _hover={{
            cursor: "pointer",
            filter: "brightness(50%)",
            transitionDuration: "250ms",
          }}
          {...rest}
        />
      </Tooltip>
      {!imageLoaded && <Skeleton w={+width} h={+height} />}
    </Box>
  );
};

export default Gif;
