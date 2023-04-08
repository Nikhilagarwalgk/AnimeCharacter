import { useEffect, useState } from "react";
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import List from "../components/List/List";
import { Box, Stack, TextField, InputAdornment, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import backImg from '../asset/img/backImg.jpg';

const Home = () => {

    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState({});

    useEffect(() => {
        if (page >= 1) {
            getData();
        }
    }, [page]);

    useEffect(() => {
        if (search !== "") {
            setTimeout(() => {
                searchListData();
            }, 3000);
        }
        return () => clearTimeout(searchListData);
    }, [search]);

    const getData = async () => {
        let config = {
            method: "GET",
            url: `https://api.jikan.moe/v4/characters?page=${page}&limit=15&q=&order_by=favorites&sort=desc`
        };

        let data = await axios(config);
        setData(data);
        console.log("data", data)
        setList(data?.data?.data);
    };

    const searchListData = async () => {
        let searchConfig = {
            method: "GET",
            url: `https://api.jikan.moe/v4/characters?page=0&limit=15&q=${search}&order_by=favorites&sort=desc`
        };

        let data = await axios(searchConfig);
        setData(data);
        console.log("search", data)
        setList(data?.data?.data);
    };

    return (
        <>
            <Box>
                <Stack alignItems='center' spacing={3} sx={{ borderBottom: "2px solid black", paddingBottom: "40px", paddingTop: "30px", backgroundImage: `url(${backImg})` }}>
                    <Typography variant="h4" gutterBottom>Search Anime Characters</Typography>
                    <TextField
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                        }}
                        onChange={(event) => { setSearch(event.target.value) }}
                    />
                    {data?.data?.pagination?.items?.total ? <Typography variant="subtitle2" gutterBottom component='div'>Total  <Box component="span" fontWeight='bold'>{(data?.data?.pagination?.items?.total).toLocaleString("en-IN")}</Box> matching anime character found</Typography> : 0}

                </Stack>
                <Box sx={{ padding: "40px" }}>
                    <List data={list} />
                </Box>
                <Stack direction={"row"} justifyContent="center" spacing={2} sx={{ padding: "20px" }}>
                    <Button variant="outlined" onClick={(e) => { setPage(page - 1) }}>Prev</Button>
                    {data?.data?.pagination?.has_next_page ? <Button variant="outlined" onClick={(e) => { setPage(page + 1) }}>Next</Button> : null}
                </Stack>
            </Box>
        </>
    )
};
export default Home;