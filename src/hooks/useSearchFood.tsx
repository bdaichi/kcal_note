import {
  Autocomplete,
  Box,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Fuse, { FuseResult } from "fuse.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Food } from "@/types/food";
import { innerShadow, modalStyle } from "@/utils/styles";
import { FoodCategory } from "@/types/food";
import { useAppSelector } from "@/stores/store";

type FilterType = FoodCategory | "none";

const foodCategory: { label: string; value: FilterType }[] = [
  { label: "なし", value: "none" },
  {
    label: "炭水化物",
    value: "carb",
  },
  { label: "肉", value: "meat" },
  { label: "魚", value: "fish" },
  { label: "野菜", value: "vegetable" },
  { label: "果物", value: "fruit" },
  { label: "乳製品", value: "dairy" },
  { label: "調味料", value: "seasoning" },
  { label: "カスタム", value: "customize" },
  { label: "その他", value: "other" },
];

type OrderType = "kcal" | "protein" | "fat" | "carb" | "none";

const foodOrder: { label: string; value: OrderType }[] = [
  { label: "なし", value: "none" },
  { label: "カロリー", value: "kcal" },
  { label: "タンパク質", value: "protein" },
  { label: "脂質", value: "fat" },
  { label: "炭水化物", value: "carb" },
];

type SortType = "asc" | "desc";

const useSearchFood = () => {
  const foods = useAppSelector((state) => state.foods.value);
  const fuse = useMemo(() => {
    const fuseOptions = {
      keys: ["name"],
      threshold: 0.3, // 一致度の閾値
    };
    return new Fuse(foods, fuseOptions);
  }, [foods]);

  const [viewFoods, setViewFoods] = useState<Food[]>(foods);
  const [searchWord, setSearchWord] = useState<string>("");
  const [category, setCategory] = useState<FilterType>("none");
  const [order, setOrder] = useState<OrderType>("none");
  const [sort, setSort] = useState<SortType>("asc");
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [isClickedSearchIcon, setIsClickedSearchIcon] =
    useState<boolean>(false);
  const categoryDefaultValue = foodCategory.find(
    (item) => item.value == category
  );
  const orderDefaultValue = foodOrder.find((item) => item.value == order);

  const searchFood = useCallback(
    (word: string) => {
      setSearchWord(word);
      if (word == "") {
        setViewFoods(foods);
      } else {
        const result = fuse.search(word);
        setViewFoods(result.map((r: FuseResult<any>) => r.item as Food));
      }
    },
    [foods, fuse]
  );

  const filterFoods = useCallback(
    (category: FilterType) => {
      setCategory(category);
      if (category == "none") {
        setViewFoods(foods);
      } else {
        const filteredFoods = foods.filter((food) => food.category == category);
        setViewFoods(filteredFoods);
      }
    },
    [setViewFoods, foods]
  );

  const orderFoods = useCallback(() => {
    if (order == "none") {
      filterFoods(category);
      return;
    }
    //slice()でコピーを作成しているのは、sort()は破壊的メソッドであるため
    const orderedFoods = viewFoods.slice().sort((a, b) => {
      if (sort == "asc") {
        return a[order] - b[order];
      } else {
        return b[order] - a[order];
      }
    });
    setViewFoods(orderedFoods);
  }, [order, sort, viewFoods]);

  useEffect(() => {
    orderFoods();
  }, [order, sort, category]);

  const filterBoxStyle = (width: number) => {
    return {
      display: "flex",
      border: 1,
      borderColor: "divider",
      height: 30,
      width: width,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 1,
      mx: 1,
      px: 1,
    };
  };

  const searchField = () => {
    return (
      <Stack
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 50,
          backgroundColor: "white",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={2}
        >
          <SearchIcon
            sx={{
              padding: 1,
              height: 55,
              width: 55,
              borderRadius: 1,
              color: "white",
              backgroundColor: "cornflowerblue",
            }}
            onClick={() => setIsClickedSearchIcon(true)}
          />
          <TextField
            value={searchWord}
            onChange={(e) => searchFood(e.target.value)}
            placeholder="食材を検索"
            sx={{ width: "70%" }}
          />
        </Stack>
        <Stack
          alignItems={"center"}
          flexDirection={"row"}
          alignSelf={"center"}
          width={"70%"}
          sx={{ borderRadius: 1, ...innerShadow, m: 1 }}
        >
          <Stack sx={{ m: 1 }}>
            <FilterAltIcon
              onClick={() => setIsOpenFilter(true)}
              sx={{
                padding: 1,
                height: 30,
                width: 30,
                color: "white",
                borderRadius: 1,
                backgroundColor: "cornflowerblue",
              }}
            />
          </Stack>
          <Stack flexDirection={"row"} sx={{ mx: 1 }}>
            {category != "none" && (
              <Box sx={filterBoxStyle(90)}>
                <Typography variant="caption">
                  {foodCategory.find((item) => item.value == category)?.label}
                </Typography>
                <Typography
                  onClick={() => filterFoods("none")}
                  color="error"
                  variant="caption"
                  sx={{ cursor: "pointer" }}
                >
                  ✕
                </Typography>
              </Box>
            )}
            {order != "none" && (
              <Box sx={filterBoxStyle(160)}>
                <Typography sx={{ mr: 2 }} variant="caption">
                  {foodOrder.find((item) => item.value == order)?.label}
                </Typography>
                <Typography sx={{ mr: 2 }} variant="caption">
                  {sort == "asc" ? "昇順" : "降順"}
                </Typography>
                <Typography
                  onClick={() => {
                    setOrder("none");
                    setSort("asc");
                  }}
                  color="error"
                  variant="caption"
                  sx={{ cursor: "pointer", ml: 1 }}
                >
                  ✕
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
        <Modal open={isOpenFilter} onClose={() => setIsOpenFilter(false)}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              フィルター
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={categoryDefaultValue}
              options={foodCategory}
              sx={{ width: 300, my: 2 }}
              onChange={(_, value) => filterFoods(value?.value ?? "none")}
              renderInput={(params) => <TextField {...params} label="分類" />}
            />
            <Stack>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={orderDefaultValue}
                options={foodOrder}
                sx={{ width: 300 }}
                onChange={(_, value) => setOrder(value?.value ?? "none")}
                renderInput={(params) => (
                  <TextField {...params} label="並び替え" />
                )}
              />
              <Select
                label="並び順"
                value={sort}
                sx={{ width: 300, my: 2 }}
                disabled={order == "none"}
                onChange={(e) => setSort(e.target.value as SortType)}
              >
                <MenuItem value="asc">昇順</MenuItem>
                <MenuItem value="desc">降順</MenuItem>
              </Select>
            </Stack>
          </Box>
        </Modal>
        <Modal
          open={isClickedSearchIcon}
          onClose={() => setIsClickedSearchIcon(false)}
        >
          <Box sx={modalStyle}>
            <Typography sx={{ textAlign: "center" }}>
              押してもなんもねーよ
            </Typography>
          </Box>
        </Modal>
      </Stack>
    );
  };

  // hooksで切り出すものなのか？ hooksとcomponentで分けるべきか？
  return { viewFoods, searchField };
};

export default useSearchFood;
