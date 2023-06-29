"use client";
import React, { useEffect, useState } from "react";
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
import DeleteModal from "@/components/admin/dashboard/provinces/DeleteModal";


const page = () => {
  const [provinces, setProvinces] = useState([]);
  const [modalClosed, setModalClosed] = useState(false);

  // To fetch the data and display it after the modal has been closed and the data has been deleted.
  useEffect(() => {
    fetchProvinces();
  }, [modalClosed]);

  async function fetchProvinces() {
    try {
      const response = await fetch("/api/admin/authorized/provinces/all", {
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
  const rows = provinces.map((province) =>
  createData(
    province.provinceName,
    province.provinceUnique,
    )
  );

  function handleModalClose() {
    setModalClosed(true);
  }
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
              {/* <TableCell align="right">تعداد شهر ها</TableCell> */}
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
                    <DeleteModal onClose={handleModalClose} provinceName={row.provinceName} provinceUnique={row.provinceUnique} />
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
