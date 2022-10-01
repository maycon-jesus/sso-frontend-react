import { FormControl } from "@chakra-ui/react";
import { FormControlLabel, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import { SyntheticEvent } from "react";
import { Checkbox as CheckboxM } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  formikKey: string;
  formik: ReturnType<typeof useFormik<any>>;
  label: string;
}

export default function Checkbox(props: Props) {
  const hasError =
    props.formik.touched[props.formikKey] &&
    Boolean(props.formik.errors[props.formikKey]);

  return (
    <FormControl isRequired>
      <FormControlLabel
        name="agreeTerms"
        label={props.label}
        checked={props.formik.values[props.formikKey]}
        onChange={props.formik.handleChange}
        onBlur={props.formik.handleBlur}
        control={<CheckboxM />}
      ></FormControlLabel>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={props.formik.errors[props.formikKey] as string}
          initial={{ opacity: 0, translateY: "-100%" }}
          animate={{ opacity: 1, translateY: "0%" }}
          exit={{ opacity: 0, translateY: "100%" }}
        >
          {hasError && (
            <FormHelperText error={hasError}>
              {props.formik.errors[props.formikKey] as string}
            </FormHelperText>
          )}
        </motion.div>
      </AnimatePresence>
    </FormControl>
  );
}
