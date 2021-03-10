package com.itmuch.react.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageRequest {
    private int pageSize = 10;
    private int pageNo;

    public int getPageSize() {
        if (pageSize <= 100) {
            return pageSize;
        }
        return 100;
    }
}
