import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import {
  KeyboardArrowDown as ArrowDownIcon,
  PushPin as PushPinIcon,
  PushPinOutlined as PushPinOutlinedIcon,
} from "@mui/icons-material";
import { memo, useState } from "react";
import { lightBlue } from "../../contants/color";
import moment from "moment";
import { fileFormate } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import {motion} from "framer-motion"

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// wraps every search match in <mark>
const renderContent = (text, query) => {
  const q = query?.trim();
  if (!q) return text;
  return text.split(new RegExp(`(${escapeRegExp(q)})`, "gi")).map((part, i) =>
    i % 2 === 1 ? (
      <mark
        key={i}
        style={{ background: "#facc15", color: "#111", borderRadius: 3, padding: "0 2px" }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const MessageComponent = ({
  message,
  user,
  isPinned = false,
  onTogglePin,
  searchQuery = "",
  isActive = false,
}) => {

  // console.log(message);
  const { _id, sender, content, attachements = [], createdAt } = message;
  const sameSender = (sender?._id || sender?.id) === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  const [menuAnchor, setMenuAnchor] = useState(null);
  // admin alerts have fake ids, only real mongo messages can be pinned
  const canPin = /^[a-f\d]{24}$/i.test(String(_id || ""));

  const closeMenu = () => setMenuAnchor(null);

  return (
    <motion.div
      id={`msg-${_id}`}
      initial={{opacity:0, x:"-100%"}}
      whileInView={{opacity:1,x:0}}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        padding: "0.65rem 0.85rem",
        borderRadius: sameSender ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        width: "fit-content",
        maxWidth: "min(75%, 34rem)",
      }}
    >
      <Box
        onContextMenu={(e) => {
          if (!canPin) return;
          e.preventDefault();
          setMenuAnchor(e.currentTarget);
        }}
        sx={{
          color: sameSender ? "white" : "text.primary",
          bgcolor: sameSender ? "primary.main" : "background.paper",
          p: "0.65rem 0.85rem",
          borderRadius: sameSender ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 8px 24px rgba(15, 23, 42, 0.08)"
              : "0 8px 24px rgba(0, 0, 0, 0.24)",
          border: "1px solid",
          borderColor: sameSender
            ? "transparent"
            : (theme) => alpha(theme.palette.text.secondary, 0.24),
          outline: isActive ? "2px solid #facc15" : "2px solid transparent",
          transition: "outline-color 0.3s",
        }}
      >
        {!sameSender && (
          <Typography color={lightBlue} fontWeight={"600"} variant={"caption"}>
            {sender.name}
          </Typography>
        )}
        {content && (
          <Typography sx={{ wordBreak: "break-word" }}>
            {renderContent(content, searchQuery)}
          </Typography>
        )}

        {/*Attatchment */}
        {attachements.length > 0 &&
          attachements.map((attachement, index) => {
            const url = attachement.url;
            const file = fileFormate(url);
            return (
              <Box key={index}>
                <a href={url} target="_blank" download style={{ color: "inherit" }}>
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography
            variant={"caption"}
            sx={{ color: sameSender ? "rgba(255,255,255,0.72)" : "text.secondary" }}
          >
            {timeAgo}
          </Typography>
          {isPinned && (
            <PushPinIcon
              sx={{
                fontSize: 14,
                color: sameSender ? "rgba(255,255,255,0.72)" : "text.secondary",
              }}
            />
          )}
          {canPin && (
            <IconButton
              size="small"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
              sx={{ p: 0, color: "inherit", opacity: 0.7, "&:hover": { opacity: 1 } }}
            >
              <ArrowDownIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            closeMenu();
            onTogglePin?.(_id);
          }}
        >
          <ListItemIcon>
            {isPinned ? (
              <PushPinOutlinedIcon fontSize="small" />
            ) : (
              <PushPinIcon fontSize="small" />
            )}
          </ListItemIcon>
          {isPinned ? "Unpin message" : "Pin message"}
        </MenuItem>
      </Menu>
    </motion.div>
  );
};

export default memo(MessageComponent);
