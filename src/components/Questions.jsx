import React from "react";
import { Textarea, Button, Divider } from "@nextui-org/react";
import { WandSparklesIcon, WrapTextIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Spinner from "./Spinner";

const Questions = ({ questions, loading, onAnswersSubmit }) => {
  const validationSchema = z.object({
    question1: z.string().min(1, "Please fill out this field."),
    question2: z.string().min(1, "Please fill out this field."),
    question3: z.string().min(1, "Please fill out this field."),
    question4: z.string().min(1, "Please fill out this field."),
    question5: z.string().min(1, "Please fill out this field."),
  });

  const defaultValues = {
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = (answers) => {
    const questionsAndAnswers = questions.map((question, index) => ({
      question,
      answer: answers[`question${index + 1}`],
    }));
    onAnswersSubmit(questionsAndAnswers);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col justify-between flex-1"
    >
      <ol className="p-8 max-w-4xl flex flex-col gap-8">
        {questions.map((question, index) => (
          <li key={`${index}-${question}`}>
            <Controller
              name={`question${index + 1}`}
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label={`${index + 1}. ${question}`}
                  labelPlacement="outside"
                  placeholder="Enter answer"
                  isInvalid={!!errors[`question${index + 1}`]}
                  errorMessage={errors[`question${index + 1}`]?.message}
                  isDisabled={loading}
                  startContent={
                    <WrapTextIcon className="stroke-foreground-400 mr-1.5" />
                  }
                  minRows={6}
                />
              )}
            />
          </li>
        ))}
      </ol>
      <div>
        <Divider />
        <div className="p-3.5 flex items-center justify-end gap-3.5">
          <Button
            type="submit"
            color="primary"
            variant="shadow"
            startContent={!loading && <WandSparklesIcon className="w-5 h-5" />}
            isLoading={loading}
            spinner={<Spinner />}
          >
            Check Answers
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Questions;
