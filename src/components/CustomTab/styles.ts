import { makeSx } from "@styles/makeSx";

export const usebStyles = makeSx((theme) => {
  const isDark = theme.palette.mode === "dark";

  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'auto',
      position: 'relative',
      flex: '1 1 0'
    },
    tabContainer: {
      boxShadow: '3px 0px 10px 0px #3434341A',
      zIndex: 3,
    },
    tabs: (mode: 'overlay' | undefined) => {
      if (mode === 'overlay') {
        return {
          minHeight: 24,
          flexShrink: 0,
          borderBottom: `1px solid ${theme.palette.divider}`,
          '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            zIndex: 9,
          },
          '& .MuiTabs-indicatorSpan': {
            width: '70%',
            height: 3,
            marginTop: '-1px',
            backgroundColor: 'primary.main',
          },
        };
      }
      return {
        '& .MuiTabs-indicator': {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          zIndex: 9,
        },
        '& .MuiTabs-indicatorSpan': {
          width: '70%',
          height: 3,
          marginTop: '-8px',
          backgroundColor: 'primary.main',
        },
      };
    },
    tab: (mode: 'overlay' | undefined) => {
      if (mode === 'overlay') {
        return {
          p: 0.5,
          minHeight: 36,
        };
      }
      return {
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        backgroundColor: isDark ? theme.palette.grey[700] : undefined,
        boxShadow: 'box-shadow: 3px 0px 10.1px 0px rgba(99, 99, 99, 0.1)',
        zIndex: 1,
        '&.Mui-selected': {
          fontWeight: theme.typography.fontWeightMedium,
          boxShadow: theme.shadows[7],
          backgroundColor: 'background.paper',
          zIndex: 4,
        },
      };
    },
  };
});
