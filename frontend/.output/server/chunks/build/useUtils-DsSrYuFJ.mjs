const useUtils = () => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  const timeAgo = (dateStr) => {
    const seconds = Math.floor(((/* @__PURE__ */ new Date()).getTime() - new Date(dateStr).getTime()) / 1e3);
    let interval = seconds / 31536e3;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592e3;
    if (interval > 1) return Math.floor(interval) + "m ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "min ago";
    return Math.floor(seconds) + "s ago";
  };
  return {
    formatDate,
    timeAgo
  };
};

export { useUtils as u };
//# sourceMappingURL=useUtils-DsSrYuFJ.mjs.map
