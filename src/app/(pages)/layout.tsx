import { Box } from "@chakra-ui/react";
import SideMenu from "@/components/sideMenu";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box bg="#F8F9FA" display="flex">
      <SideMenu />
      <Box bg={"#F8F9FA"} w="300px"></Box>
      {children}
    </Box>
  );
}
