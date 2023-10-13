import React from "react";
import { Box, Divider, Icon } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { AiOutlineInbox } from "react-icons/ai";

const Empty: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <Flex w="100%" h="50%" align="center" justify="center">
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap={3}
      >
        <Icon as={AiOutlineInbox} boxSize={20}/>
        <Divider m={2} />
        <Box>{msg}</Box>
      </Flex>
    </Flex>
  );
};

export default Empty;
