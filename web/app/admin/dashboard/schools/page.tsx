"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  unique: number,
  city: string,
  stdents: number,
  drivers: number,
  admins: number,
  actions: string
) {
  return { name, unique, city, stdents, drivers, admins, actions };
}

const rows = [createData("مدرسه شماره یک", 159, "شیراز", 24, 6, 1, "مشاهده")];

const page = () => {
  return (
    <div className="w-full my-5">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">نام</TableCell>
              <TableCell align="right">کد یکتا</TableCell>
              <TableCell align="right">شهر</TableCell>
              <TableCell align="right">دانش آموزان</TableCell>
              <TableCell align="right">رانندگان</TableCell>
              <TableCell align="right">مدیران</TableCell>
              <TableCell align="right">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.unique}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.stdents}</TableCell>
                <TableCell align="right">{row.drivers}</TableCell>
                <TableCell align="right">{row.admins}</TableCell>
                <TableCell
                  align="right"
                  className="text-sky-500 font-semibold">
                  {row.actions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default page;
