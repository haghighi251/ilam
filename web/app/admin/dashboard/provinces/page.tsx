"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from '@mui/material';
import AddModal from "@/components/admin/dashboard/provinces/AddModal";
import UpdateModal from "@/components/admin/dashboard/provinces/UpdateModal";
import DeleteButton from "@/components/admin/dashboard/provinces/DeleteButton";


const page = () => {
  const [provinces, setProvinces] = React.useState([]);
  const [modalClosed, setModalClosed] = React.useState(false);
  const [refreshData, setRefreshData] = React.useState(false);

  React.useEffect(() => {
    fetchProvinces();
  }, [modalClosed, refreshData]);

  async function fetchProvinces() {
    try {
      const response = await fetch("/api/admin/authorized/provinces/read", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProvinces(data.data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function createData(provinceName, provinceUnique) {
    return { provinceName, provinceUnique };
  }
  function handleModalClose() {
    setModalClosed(true);
  }
  const rows = provinces.map((province) =>
    createData(
      province.provinceName,
      province.provinceUnique,
    )
  );
  return (
    <div className="w-full my-5">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
        <div>استان ها</div>
        <div><AddModal onClose={handleModalClose} /></div>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 350 }}
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">نام استان</TableCell>
              <TableCell align="right">کد شناسایی</TableCell>
              <TableCell align="right">عملیات</TableCell>
              {/* <TableCell align="right">تعداد شهر ها</TableCell>
              <TableCell align="right">عملیات</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.provinceName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                 align="right"
                  component="th"
                  scope="row">
                  {row.provinceName}
                </TableCell>
                <TableCell align="right">{row.provinceUnique}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: '' }}>
                    <UpdateModal onClose={handleModalClose} provinceName={row.provinceName} provinceUnique={row.provinceUnique} />
                    <DeleteButton setRefreshData={setRefreshData} provinceName={row.provinceName} provinceUnique={row.provinceUnique} />
                  </Box>
                </TableCell>
                {/* <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.links}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default page;
