import { Container } from '@mui/material';
import { styled } from '@mui/system';
import React, { ChangeEvent } from 'react';

const FilePickerContainer = styled('div')`
   display: flex;
   align-items: center;
   gap: 10px;
   margin-bottom: 20px;
`;

const FilePickerInput = styled('input')`
   display: none;
`;

const FilePickerLabel = styled('label')`
   padding: 10px;
   background-color: #f5f5f5;
   color: #333;
   border-radius: 4px;
   cursor: pointer;
`;

const FilePicker: React.FC = ({ file, setFile }) => {
   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setFile(file || null);
   };

   return (
      <Container>
         <FilePickerContainer>
            <FilePickerInput
               type="file"
               id="filePicker"
               onChange={handleFileChange}
            />
            <FilePickerLabel htmlFor="filePicker">
               {file ? file.name : 'انتخاب فایل'}
            </FilePickerLabel>
         </FilePickerContainer>
      </Container>
   );
};

export default FilePicker;
