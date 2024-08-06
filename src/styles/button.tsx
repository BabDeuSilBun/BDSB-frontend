import { Button, ButtonProps } from '@chakra-ui/react';

const baseBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="solid"
      size="md"
      width="328px"
      height="44px"
      {...props}
    >
      {children}
    </Button>
  );
};

// const baseButton_inactive = styled(Button)`
//   background-color: #f5f6f7;
//   color: #4b4f56;
//   border: 1px solid #ccd0d5;

//   &:hover {
//     background-color: #ebedf0;
//   }

//   &:active {
//     background-color: #dddfe2;
//     transform: scale(0.98);
//     border-color: #bec3c9;
//   }

//   &:focus {
//     box-shadow: 0 0 1px 2px rgba(88, 144, 255, 0.75), 0 1px 1px rgba(0, 0, 0, 0.15);
//   }
// `;

// const smallbtn_purple = styled(Button)`
//   background-color: #f5f6f7;
//   color: #4b4f56;
//   border: 1px solid #ccd0d5;

//   &:hover {
//     background-color: #ebedf0;
//   }

//   &:active {
//     background-color: #dddfe2;
//     transform: scale(0.98);
//     border-color: #bec3c9;
//   }

//   &:focus {
//     box-shadow: 0 0 1px 2px rgba(88, 144, 255, 0.75), 0 1px 1px rgba(0, 0, 0, 0.15);
//   }
// `;

// const smallbtn_light = styled(Button)`
//   background-color: #f5f6f7;
//   color: #4b4f56;
//   border: 1px solid #ccd0d5;

//   &:hover {
//     background-color: #ebedf0;
//   }

//   &:active {
//     background-color: #dddfe2;
//     transform: scale(0.98);
//     border-color: #bec3c9;
//   }

//   &:focus {
//     box-shadow: 0 0 1px 2px rgba(88, 144, 255, 0.75), 0 1px 1px rgba(0, 0, 0, 0.15);
//   }
// `;

// const roundbtn_filled = styled(Button)`
//   background-color: #f5f6f7;
//   color: #4b4f56;
//   border: 1px solid #ccd0d5;

//   &:hover {
//     background-color: #ebedf0;
//   }

//   &:active {
//     background-color: #dddfe2;
//     transform: scale(0.98);
//     border-color: #bec3c9;
//   }

//   &:focus {
//     box-shadow: 0 0 1px 2px rgba(88, 144, 255, 0.75), 0 1px 1px rgba(0, 0, 0, 0.15);
//   }
// `;

// const roundbtn_outlined = styled(Button)`
//   background-color: #f5f6f7;
//   color: #4b4f56;
//   border: 1px solid #ccd0d5;

//   &:hover {
//     background-color: #ebedf0;
//   }

//   &:active {
//     background-color: #dddfe2;
//     transform: scale(0.98);
//     border-color: #bec3c9;
//   }

//   &:focus {
//     box-shadow: 0 0 1px 2px rgba(88, 144, 255, 0.75), 0 1px 1px rgba(0, 0, 0, 0.15);
//   }
// `;

export default {
  baseBtn,
  // baseButton_inactive, 
  // smallbtn_purple, 
  // smallbtn_light, 
  // roundbtn_filled, 
  // roundbtn_outlined
};