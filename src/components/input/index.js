import React from "react"
import { Flex } from "rebass"
import { Input, Label } from "@rebass/forms"
import styled from "@emotion/styled"
import Typography from "../typography"

const StyledInput = styled(Input)`
  ${Typography.Base}
  ${props =>
    props.inline &&
    `
  max-width: 350px;
  flex-grow: 1;
  margin-left: 5px;
  `}
`

const StyledLabel = styled.div`
  ${Typography.Base}
  ${props =>
    props.inline
      ? `
  text-align: right;
  padding-right: 15px;
  `
      : `
  padding-bottom: 10px;
  `}
`

const InputField = React.forwardRef(
  ({ placeholder, inline, label, name, type, ...props }, ref) => {
    return (
      <Flex
        alignItems={inline && "center"}
        flexDirection={inline ? "row" : "column"}
        {...props}
      >
        {label && (
          <Label
            maxWidth={"200px"}
            htmlFor={name}
            display={inline && "inline !important"}
          >
            <StyledLabel inline={inline}>{label}</StyledLabel>
          </Label>
        )}
        <StyledInput
          ref={ref}
          inline={inline}
          variant="input"
          name={name}
          type={type}
          placeholder={placeholder ? placeholder : "Placeholder"}
        />
      </Flex>
    )
  }
)

export default InputField
