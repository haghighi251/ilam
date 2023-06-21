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
  calories: number,
  fat: string,
  city: number,
  links: string
) {
  return { name, calories, fat, city, links };
}

const rows = [
  createData("ایلام", 159, "20 اردیبهشت 1402", 1, "مشاهده"),
  createData("فارس", 237, "20 اردیبهشت 1402", 3, "مشاهده"),
];

const page = () => {
  return (
    <div className="w-full my-5">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 350 }}
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>نام استان</TableCell>
              <TableCell align="right">کد شناسایی</TableCell>
              <TableCell align="right">تاریخ</TableCell>
              <TableCell align="right">تعداد شهر ها</TableCell>
              <TableCell align="right">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.links}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default page;
