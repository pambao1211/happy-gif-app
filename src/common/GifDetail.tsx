import { Box, Divider, Flex, Icon, Stack } from "@chakra-ui/react";
import { MdOutlineSubtitles } from "react-icons/md";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlineStar, AiOutlineUser } from "react-icons/ai";
import { IGif } from "../types/IGif.ts";

interface PropsGifDetail {
  gif: IGif;
  w: string;
}

interface PropsItem {
  headline: string;
  value: string;
  icon: IconType;
}

const Item: React.FC<PropsItem> = ({ headline, value, icon }) => {
  return (
    <Flex direction="column"  justify="left" align="flex-start" gap={3}>
      <Flex align="center" justify="flex-start" gap={1}>
        <Icon as={icon} />
        <Box>{headline}:</Box>
      </Flex>
      <Box>
        {value}
      </Box>
    </Flex>
  );
};

const GifDetail: React.FC<PropsGifDetail> = ({ gif, w }) => {
  const { title, username, rating } = gif;
  return (
    <Flex
      color="gray.800"
      mb={3}
      shadow="md"
      borderRadius="xl"
      justify="center"
      align="center"
      bg="blue.400"
      p={3}
      maxW={w}
    >
      <Stack >
        <Item headline="Title" value={title} icon={MdOutlineSubtitles} />
        <Divider colorScheme="pink"/>
        <Item headline="Username" value={username} icon={AiOutlineUser} />
        <Divider/>
        <Item headline="Rating" value={rating} icon={AiOutlineStar} />
      </Stack>
    </Flex>
  );
};

export default GifDetail;
