'use client';

import { Container, Paper, Typography } from '@mui/material';
import { ContainerProps } from '@mui/material/Container';
import { PaperProps } from '@mui/material/Paper';
import { TypographyProps } from '@mui/material/Typography';

export type FormWrapperProps = Readonly<{
  title?: string;
  elevation?: number;
  children: React.ReactNode;
  titleConfig?: TypographyProps;
  containerConfig?: ContainerProps;
  paperConfig?: PaperProps;
  blockConfig?: ContainerProps;
}>;

export const FormWrapper = ({ title, elevation = 3, children, ...rest }: FormWrapperProps) => {
  return (
    <Container maxWidth='sm' {...rest.containerConfig}>
      <Paper elevation={elevation} {...rest.paperConfig}>
        {title && (
          <Typography variant='h2' sx={{ textAlign: 'center' }} {...rest.titleConfig}>
            {title}
          </Typography>
        )}
        <Container maxWidth='sm' {...rest.blockConfig}>
          {children}
        </Container>
      </Paper>
    </Container>
  );
};
