import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import LoadingButton from '@mui/lab/LoadingButton';

const DeleteButton = ({ handleClose, provinceName, provinceUnique }) => {
    // Component's states
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>("");
    const [successMessage, setSuccessMessage] = React.useState<string>("");

    const handleDelete = async () => {
        console.log(provinceUnique)
        let errorMsg = null;
        if (provinceName === null || provinceName === undefined || provinceUnique === null || provinceUnique === undefined){
            errorMsg = "خطا در ارسال اطلاعات";
            setError(errorMsg);
        }

        if (errorMsg === null) {
            setLoading(true);
            setError(null);
            try {
                console.log(JSON.stringify({
                    provinceUnique: provinceUnique,
                }));
                // The DELETE method should be handled differently than the POST and PATCH methods.
                const response = await fetch(`/api/admin/authorized/provinces/delete/${provinceUnique}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                  });

                const responseData = await response.json();
                console.log(responseData);
                if (responseData.success) {
                    setSuccessMessage("استان با موفقیت حذف شد.");
                    handleClose(); // refresh the page data if the selected data deleted successfully.
                } else {
                    setError(responseData.error);
                }
            } catch (error) {
                console.log("Error:", error);
                setError("خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.");
            }
            setLoading(false);
        }
    };

  return (
    <div>
        <LoadingButton
          size="medium"
          color="error"
          onClick={handleDelete}
          loading={loading}
          loadingPosition="start"
          startIcon={<DeleteTwoToneIcon sx={{ ml: 2 }} />}
          variant="outlined"
        >
          <span>حذف</span>
        </LoadingButton>
        
    </div>
  );
}


export default DeleteButton;