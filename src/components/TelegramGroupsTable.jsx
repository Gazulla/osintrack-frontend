import { useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Image, Button } from "@nextui-org/react";
import { EditIcon } from "../assets/svg/EditIcon";
import { DeleteIcon } from "../assets/svg/DeleteIcon";
import { AddIcon } from "../assets/svg/AddIcon";

const columns = [
  { name: "ID", uid: "id" },
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "SUBS", uid: "subs" },
  { name: "SAVED MSGS", uid: "savedMsgs" },
  { name: "PARSE", uid: "parse" },
  { name: "ACTIONS", uid: "actions" },
];

const groups = [
  {
    id: 108432,
    name: "Russia news",
    description: "The latest news from Russia",
    subs: 110223,
    savedMsgs: 2947,
    parse: false,
    image: "/images/russia.png",
  },
  {
    id: 119842,
    name: "Ucranian news",
    description: "The latest news from Ucraine",
    subs: 40223,
    savedMsgs: 134,
    parse: true,
    image: "/images/ucraine.png",
  },
];

export default function TelegramGroupsTable() {
  const renderCell = useCallback((group, columnKey) => {
    const cellValue = group[columnKey];

    switch (columnKey) {
      case "image":
        return <Image src={group.image} width={40} height={40} radius="sm" />;
      case "name":
        return <p className="font-bold">{cellValue}</p>;
      case "parse":
        return (
          <Chip className="capitalize" color={group.parse === true ? "success" : "danger"} size="sm" variant="flat">
            {group.parse ? "Yes" : "No"}
          </Chip>
        );
      case "subs":
      case "savedMsgs":
      case "id":
        return <p className="text-neutral-400 font-semibold">{cellValue}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit group">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete group">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold mb-2 mt-4">Telegram groups</h3>
        <Button color="primary" variant="light" size="sm">
          <div className="flex gap-1 items-center font-semibold">
            <AddIcon width={18} />
            <span>ADD GROUP</span>
          </div>
        </Button>
      </div>

      <Table removeWrapper aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={groups}>
          {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
        </TableBody>
      </Table>
    </>
  );
}
