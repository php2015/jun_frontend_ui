package com.chensi.common;

import java.util.List;

/**
 * 分页类
 * @author Chason
 * @version 2016-4-7 下午4:08:35
 */
public class Pager {

	// 传递的参数或是配置的参数
	private int pageNo = 1; // 当前页
	private int pageSize = Constants.PAGESIZE; // 每页显示多少条记录

	// 查询数据库
	private List list; // 本页的数据列表
	private int totalRow; // 总记录数

	// 计算
	private int totalPage; // 总页数
	private int start; // 页码列表的开始索引（包含）
	private int end; // 页码列表的结束索引（包含）

	public Pager() {
		super();
	}

	/**
	 * 只接受4个必要的属性，会自动的计算出其他3个属性的值
	 * 
	 * @param pageNo
	 * @param pageSize
	 * @param list
	 * @param totalRow
	 */
	public Pager(int pageNo, int pageSize, List list, int totalRow) {
		super();
		this.pageNo = pageNo;
		this.pageSize = pageSize;
		this.list = list;
		this.totalRow = totalRow;

		// 计算 totalPage
		totalPage = (totalRow + pageSize - 1) / pageSize;

		// 计算 start 与 end
		// >> 总页码小于等于10页时，全部显示
		if (totalPage <= 10) {
			start = 1;
			end = totalPage;
		}
		// >> 总页码大于10页时，就只显示当前页附近的共10个页码
		else {
			// 默认显示 前4页 + 当前页 + 后5页
			start = pageNo - 4; // 7 - 4 = 3;
			end = pageNo + 5; // 7 + 5 = 12; --> 3 ~ 12

			// 如果前面不足4个页码时，则显示前10页
			if (start < 1) {
				start = 1;
				end = 10;
			}
			// 如果后面不足5个页码时，则显示后10页
			else if (end > totalPage) {
				end = totalPage;
				start = totalPage - 9;
			}
		}
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalRow() {
		return totalRow;
	}

	public void setTotalRow(int totalRow) {
		this.totalRow = totalRow;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

}
