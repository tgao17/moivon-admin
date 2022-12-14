import React from "react";
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

const NavItem = ({ icon, children, ...rest }) => {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color="inherit"
      _dark={{
        color: "gray.400",
      }}
      _hover={{
        bg: "gray.100",
        _dark: {
          bg: "gray.900",
        },
        color: "gray.900",
      }}
      role="group"
      fontWeight="500"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          color="#545d7b"
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

export default NavItem;
