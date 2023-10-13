import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import ButtonScrollToTop from "../common/ButtonScrollToTop.tsx";

const Body: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex w="100vw" justify="center">
      <Flex
        w="100%"
        maxW="1280px"
        dir="row"
        justify="center"
        padding={[10, 10]}
      >
        {children}
        <ButtonScrollToTop />
      </Flex>
    </Flex>
  );
};

export default Body;
