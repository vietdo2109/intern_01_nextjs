import { useCreateQuiz } from "@/components/services/mutations";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function CreateQuizConfirmModal({
  isOpen,
  onClose,
}: // quiz,
// modifyQuiz,
{
  isOpen: boolean;
  onClose: () => void;
  // quiz: Quiz;
  // modifyQuiz: Dispatch<SetStateAction<Quiz>>;
}) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const router = useRouter();
  const createQuiz = useCreateQuiz();
  const onSubmit = async (data: { title: string; description: string }) => {
    const createQuizResponse = await createQuiz.mutateAsync({
      ...data,
      questionids: [],
    });
    console.log(createQuizResponse.id);
    console.log(data);
    router.push(`quiz/add-quiz/${createQuizResponse.id}`);
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              {...register("title")}
              type="text"
              width="100%"
              placeholder='Enter a title, for example "Biology - Chapter 22: Evolution"'
            />
            <Input
              type="text"
              width="100%"
              placeholder="Add description..."
              {...register("description")}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={createQuiz.isPending}
            >
              Save
            </Button>
            <Button onClick={onClose} isLoading={createQuiz.isPending}>
              Cancel
            </Button>
            <DevTool control={control} />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
