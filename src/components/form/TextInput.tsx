import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  formik: ReturnType<typeof useFormik<any>>;
  formikKey: string;
  label?: string;
  autoComplete?: string;
  placeHolder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  slot_inputRightElement?: React.ReactNode;
}

export function TextInput({
  formik,
  formikKey,
  label,
  autoComplete,
  placeHolder,
  isRequired,
  isDisabled,
  slot_inputRightElement,
}: Props) {
  return (
    <FormControl
      isInvalid={formik.touched[formikKey] && Boolean(formik.errors[formikKey])}
      isRequired={isRequired}
      isDisabled={isDisabled}
    >
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          name={formikKey}
          autoComplete={autoComplete}
          placeholder={placeHolder}
          variant="filled"
          value={formik.values[formikKey]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></Input>
        {slot_inputRightElement}
      </InputGroup>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={formik.errors[formikKey] as string}
          initial={{ opacity: 0, translateY: "-100%", height: 0 }}
          animate={{ opacity: 1, translateY: "0%", height: "auto" }}
        >
          {formik.errors[formikKey] && (
            <FormErrorMessage>
              {formik.errors[formikKey] as string}
            </FormErrorMessage>
          )}
        </motion.div>
      </AnimatePresence>
    </FormControl>
  );
}
