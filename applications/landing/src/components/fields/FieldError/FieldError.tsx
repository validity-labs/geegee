import React from 'react';

import { Box, FormHelperText } from '@mui/material';

interface Props {
  id: string;
  message?: string;
  // field?: string;
}

const FieldError = ({ id, message }: Props) => {
  return (
    <Box component={FormHelperText} id={`${id}Helper`} title={message} error={true}>
      <Box display="block" component="span">
        {message}
      </Box>
    </Box>
  );
};

export default FieldError;
