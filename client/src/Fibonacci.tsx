import {
  Box,
  Button,
  Heading,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  TableCaption,
  Td,
  Th,
  Tr,
  UnorderedList,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import { addIndex, getFibonacciValues, getIndices } from "./api/fibonacci";
import { useQuery, useMutation, useQueryClient } from "react-query";
import React, { useState } from "react";

const Fibonacci = () => {
  const { data: values } = useQuery("fibonacci_values", getFibonacciValues);
  const { data: indices } = useQuery("fibonacci_incides", getIndices);
  const { mutate: addIndexMutation } = useMutation(addIndex);
  console.log({ values, indices });
  const [index, setIndex] = useState<number>();
  const queryClient = useQueryClient();
  return (
    <Box as="section" bg={mode("gray.100", "gray.700")} py="12">
      <Box
        textAlign="center"
        bg={mode("white", "gray.800")}
        shadow="lg"
        maxW={{ base: "xl", md: "3xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
        py="12"
        rounded="lg"
      >
        <Box maxW="md" mx="auto">
          <Heading mt="4" fontWeight="extrabold">
            Fibonacci Generator
          </Heading>
          <Box mt="6">
            <form
              onSubmit={(e: { preventDefault: () => void; target: any }) => {
                e.preventDefault();
                // your subscribe logic here
                const target = e.target as typeof e.target & {
                  index: { value: number };
                };
                const index = target.index.value; // typechecks!
                console.log({ index });
                setIndex(index);
                addIndexMutation(
                  { index },
                  {
                    onSettled: () => {
                      queryClient.invalidateQueries("fibonacci_values");
                      queryClient.invalidateQueries("fibonacci_incides");
                      setIndex(undefined);
                    },
                  }
                );
              }}
            >
              <Stack>
                <NumberInput
                  defaultValue={15}
                  max={40}
                  name="index"
                  value={index}
                  aria-label="Enter the index"
                  placeholder="Enter the index to generate a Fibonnaci number..."
                  keepWithinRange={false}
                  clampValueOnBlur={false}
                  rounded="base"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  type="submit"
                  w="full"
                  colorScheme="blue"
                  size="lg"
                  textTransform="uppercase"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  Generate
                </Button>
              </Stack>
            </form>
          </Box>
          {indices && (
            <React.Fragment>
              <Heading mt="4" fontWeight="extrabold">
                Seen Indices
              </Heading>
              <UnorderedList
                orientation="horizontal"
                display={"flex"}
                listStyleType={"none"}
              >
                {indices.map((index: { number: number }) => (
                  <ListItem flex={1 / indices.length}>
                    {index.number.toString()}
                  </ListItem>
                ))}
              </UnorderedList>
            </React.Fragment>
          )}
          {values && Object.keys(values).length > 0 && (
            <React.Fragment>
              <Table variant="simple" mt={4}>
                <TableCaption placement="top">Calculated values</TableCaption>
                <Tr>
                  <Th isNumeric>For Index</Th>
                  <Th isNumeric>Calculated</Th>
                </Tr>
                {Object.keys(values).map((key: any) => (
                  <Tr>
                    <Td isNumeric>{key}</Td>
                    <Td isNumeric>{values[key]}</Td>
                  </Tr>
                ))}
              </Table>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Fibonacci;
