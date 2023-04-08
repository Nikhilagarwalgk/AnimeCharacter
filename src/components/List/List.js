import { Box, Stack, Chip, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';

const List = (props) => {
    const { data } = props;

    return (
        <>
            <Box>
                <Stack spacing={2} >
                    {data.length > 0 ?
                        (
                            data?.map((item) => {
                                return (
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ border: "2px solid #0f0f0f" }} key={item.mal_id}>
                                        <Stack direction="row" alignItems="center">
                                            <img src={item.images.webp.image_url} alt="Anime Image" width="70" height="104px" padding="2px" />
                                            <Stack sx={{ margin: "9px" }} >
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="h5" gutterBottom>{item.name}</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    {
                                                        item.nicknames?.map((nickName) => {
                                                            return (
                                                                <Chip label={nickName} />
                                                            )
                                                        })
                                                    }
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack direction={"row"} >
                                            <Stack direction={"row"} sx={{ borderRight: "2px solid black", height: "104px", marginRight: "38px", paddingRight: "10px" }}  >
                                                <FavoriteIcon fontSize="small" sx={{ color: "#dc0c0c" }} />
                                                {item.favorites}
                                            </Stack>
                                            <Stack justifyContent="center" sx={{ marginRight: "33px" }}>
                                                <ArrowForwardIcon fontSize="large" sx={{ cursor: "pointer" }} onClick={() => { window.open(item.url, '_blank') }} />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                )
                            })
                        )
                        : <Typography variant="h5" align="center" gutterBottom> {"No result found!"}</Typography>
                    }
                </Stack>
            </Box>
        </>
    )
};
export default List;