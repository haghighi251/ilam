import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Row = (props) => {
    const { key, row } = props;
    const [open, setOpen] = useState(false);

    const [cityCoordinates, setCityCoordinates] = useState([]);
    const [modalClosed, setModalClosed] = useState(false);
    const [provinceName, setProvinceName] = useState("");
    // To fetch the data and display it after the modal has been closed and the data has been deleted.
    useEffect(() => {
        fetchCityCoordinates();
        fetchProvince();
    }, [modalClosed])

    async function fetchCityCoordinates() {
        try {
        const response = await fetch("/api/admin/authorized/cities/coordinates/read", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok) {
            setCityCoordinates(data.data);
        } else {
            console.error(data.error);
        }
        } catch (error) {
        console.error(error);
        }
    }

    function createData(
        cityCoordinateUnique: string,
        cityUnique: string,
        latitude: string,
        longitude: string,
        rowNumber: string,
    ) {
        return {
        cityCoordinateUnique,
        cityUnique,
        latitude,
        longitude,
        rowNumber,
        };
    }
    const coordinatesRows = cityCoordinates.map((item) =>
        createData(
          item.cityCoordinateUnique,
          item.cityUnique,
          item.latitude,
          item.longitude,
          item.rowNumber,
        )
    );

    async function fetchProvince () {
      try {
        const response = await fetch(`/api/admin/authorized/provinces/read/${row.provinceUnique}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
        const responseData = await response.json();
        if (response.ok) {
          setProvinceName(responseData.data);
        } else {
          console.error(responseData.error);
        }
      } catch (error) {
        console.error(error);
      }

    }
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open)
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="right" component="th" scope="row">
            {row.cityName}
          </TableCell>
          <TableCell align="right">{row.cityUnique}</TableCell>
          <TableCell align="right">{provinceName}</TableCell>
          <TableCell align="right">{row.provinceUnique}</TableCell>
          <TableCell align="right">{row.speedMin}</TableCell>
          <TableCell align="right">{row.speedMax}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  مختصات
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">شناسه مختصات</TableCell>
                      <TableCell align="right">شناسه شهر</TableCell>
                      <TableCell align="right">عرض جغرافیایی(lat)</TableCell>
                      <TableCell align="right">طول جغرافیایی(lon)</TableCell>
                      <TableCell align="right">شماره ستون</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {coordinatesRows.map((item) => (
                      <TableRow key={item.cityUnique}>
                        <TableCell align="right">
                          {item.cityCoordinateUnique}
                        </TableCell>
                        <TableCell align="right">
                          {item.cityUnique}
                        </TableCell>
                        <TableCell align="right">{item.latitude}</TableCell>
                        <TableCell align="right">{item.longitude}</TableCell>
                        <TableCell align="right">{item.rowNumber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

export default Row;
