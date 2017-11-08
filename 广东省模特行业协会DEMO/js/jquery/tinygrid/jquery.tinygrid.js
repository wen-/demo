/*
 * name: jquery.tinygrid.js
 *
 * Copyright (c) 2009
 * 
 * $author: huang weijian(黄伟鉴)$
 * $Date: 2009/07/28 07:14:38 $
 * $Contact: alvin.huang.wj@gmail.com$
 * $Reference: flexigrid by Paulo P. Marinas (webplicity.net/flexigrid)
 */
 
/**
 * 一个小型/灵巧的基于jQuery的Grid控件. 
 * 
 * 目前只支持两级的标题.
 * 
 * @author huang weijian
 */
(function($) {
	if (!String.prototype.format) {
		String.prototype.format = function(params) {
			var args = params;
			return this.replace(/{(\d{1})}/g, function(index, index2) {
				return args[index2];
			});
		};
	}
	
	$.getGreaterNum = function(num1, num2) {
		try {
			num1 = parseInt(num1);
		} catch (e) {
			return num2;
		}
		try {
			num2 = parseInt(num2);
		} catch (e) {
			return num1;
		}
		return num1 > num2 ? num1 : num2;	
	};
	$.isArray = function(obj) {
    	return obj && obj instanceof Array || typeof obj == "array";
	};
	$.getTextFromHtml = function(html) {
		var result = html;
		var htmlTest = /^[^<]*(<(.|\s)+>)[^>]*$/;
		if (htmlTest.test(html)) {
			result = $(html).text();
		}
		if (result) {
			return result.replace(/"/g, '\"').replace(/'/g, "\'");
		}
		return result;
	};
	
	$.addTinygrid = function(placeholder, options) {	
		var $placeholder = $(placeholder);
		$placeholder.attr({cellPadding:0,cellSpacing:0,border:0}).removeAttr('width').removeAttr('height');
		
		// 样式中设置的高度
		var heights = {
			title : 25, // 标题
			toolbar : 29, // 工具栏
			tableHead : ($.browser.msie && $.browser.version < 8) ? 27 : 26, // 表格头
			statistics : 23, // 统计栏
			pager : 28 // 分页
		};
		
		/**
		 * tinygrid使用到的样式
		 */
		var classNames = {
			globalContainerClass : 'globalContainerClass',
			
			titleContainerClass : 'titleContainerClass', // 整个标题栏的标式
			titleClass : 'titleClass', // 标题的样式
			
			buttonContainerClass : 'buttonContainerClass', // 整个工具栏的样式
			innerContainer : 'innerContainer', // 工具栏的按钮区样式 -- 左对齐
			innerContainer4Right : 'innerContainerRight', // 工具栏的按钮区样式--右对齐
			toolbarItemClass : 'toolbarItemClass', 
			buttonItemClass : 'buttonItemClass', // 按钮的样式
			buttonSpanClass : 'grid-button',
			buttonGroupClass : 'buttonItemClass', // 按钮群的样式
			buttonGroupContainerClass : 'buttonGroupContainerClass', // 按钮群的样式
			buttonGroupItemClass : 'buttonGroupItemClass', // 按钮群的按钮样式
			
			tableHeadContainerClass : 'tableHeadContainerClass', // 表格标题区域的样式
			noBorderTop : 'no-border-top',  
			tableContainerClass : 'tableContainerClass', // 表格数据区域的样式
			sortedClass : 'sorted',
			ascClass : 'asc',
			descClass : 'desc',
			oddRowClass : 'oddRowClass', // 奇数行的样式
			evenRowClass : 'evenRowClass', // 偶数行的样式
			selectedClass : 'selectedClass', // 当前选中的样式
			
			messageTipContainerClass : 'messageTipContainerClass', // 信息提示区域
			errorMessageTipClass : 'errorMessageTipClass', // 出错信息提示
			
			statisticsContainerClass : 'statisticsContainerClass', // 统计栏
			
			pagerContainerClass : 'pagerContainerClass', // 整个分页栏的样式
			
			editableClass : 'editableClass' // 可编辑输入框样式 
		};
		
		/**
		 * 该tinygrid控件的一些默认设置
		 */
		var defaults = {
			defaultPrecision : 2, // 默认的计算数值精度
			
			cellBorderWidth : 1, // 单元格的border宽度
			
			adaptiveHeight : true, // 自适用高度
			height : 350, // 默认高度, 单位px
			width : 'auto', // 默认宽度
			striped : true, // 是否有斑马线
			minwidth : 30, // 每个单元格的最小宽度
			minheight : 50, // 表格区域的最小高度
			
			title : false,	
			showTitle : false, // 是否显示标题
			
			usepager : true, // 是否使用分页栏?
			cachePageData : false, // 是否缓存已加载页码的数据? 即分页时不重新加载
			autoload : true,
			
			showMessageTip : true,
			
			rowClickToDoTick : false,	//是否行触发单击进行勾选前面的checkbox/radio的操作？
			rowClickJustCheckOne : false, // 行触发单击进行勾选时, 是否只选中当前行而取消其它行的选中?
			
			buttons : false, // 格式: [{[id:'id1',] name:'标题', onpress:pressId1, bclass:'classname', tip:'提示信息', disabled : true}
					// 按钮群的设置: [{上面普通按钮设置}, {id:'gid', name:'群标题', group:[{普通按钮设备}], gclass:'classname', tip:'tip'}]
					// 分左右按钮区的设置: {'left' : [{按钮}, {按钮}],  'right' : [{按钮}]}
			colModel : [], // 列模型格式: [{header:'标题', dataIndex:'col_name' [field:'javabean_fieldname',width:80, percent:0.3 
							//			, sortable:true, align:'left', cellClass:'className', cellRenderer:function(val, trId)
							//			, cellRenderer2:function({dataIndex:xxxx}, trId, [cellvalue]), rowClassRenderer:function(val, rowIndex),]
							//			, accumulation : false
							//			, lineBreak:false, showTip:false, editable:false, countable:false, precision:2, countRenderer:function(val)}]
			widthPercentSupport : false, // 是否支持colModel的percent设置
			customizeButtonHtml : '', // 自定义的按钮HTML, 常用于信息提示(如状态图的说明等)
			
			url : false, // ajax url
			method : 'POST', // POST 还是 GET
			dataType : 'json', // 调用url后得到的数据格式
			errormsg : '连接错误！',
			
			useTimeout : false, // 是否使用超时判断?
			timeout : 300, // 超时设置,单位为秒(s), 默认为: 5m
			
			page : 1, // 当前的页码
			total : 0, // 总共的记录数
			showTotal : true,
			messageWhenHideTotal : '', // 当showTotal为false时, 默认显示的提示信息
			showRpSelect : true, // 是否显示每页多少条记录的选择框
			rp : 20, // 默认的每页显示的记录条数
			rpOptions : [10, 15, 20, 40, 50, 100], // 选择框里的选项
			
			initmsg : false, // 初始化提示信息
			
			pagestat : '共 {total} 条记录',
			procmsg : '正在处理，请稍等...',
			nomsg : '<em style="color:#A25A66;">没有记录！</em>',
			statusBar : false, // 分页栏右边的状态提示信息
			
			onChangeSort : false, // function onChangeSort(sortname, sortorder, placeholder)
			onChangePage : false, // 在分页之前触发的动作 function onChangePage(page, placeholder)
			onSuccess : false, // function onSuccess(placeholder)
			onNoDataReturn : false, // function onNoDataReturn(placeholder)
			preProcess : false, // 从后台得到数据后的处理操作 function preProcess(data, placeholder)
			onRpChange : false, // function onRpChange(rp, placeholder)
			onRowClick : false, // function onRowClick(tr, placeholder)
			// 行的双击事件, function onRowDblClick(tr, placeholder)
			onRowDblClick : false, 
			onTimeout : false, // 自定义的超时处理 function onTimeout(placeholder)
			onSubmit : false, // 提交到后台之前先执行的动作, function() {xxx; return true;}
			
			sortname : '', // 默认排序的字段
			sortorder : 'asc', // 默认排序的次序, ‘asc’ or ‘desc’
			defaultSortOrderWhenClicked : 'asc',
			
			newp : 0, // 要改变的页码
			
			hideToolbar : false, // 显示隐藏工具栏
			
			// 把同一组类型的数据附上相同的斑纹条
			// 格式: { groupBy : dateIndex, // 分组依据
			//        classes : [className] } // 斑纹条样式(循环使用)  
			stripes : false,
			
			// private, don't set these values by yourself
			_loading : false, // 是否正在加载数据
			_pages: 1, // 总页数
			_overtime : true, // 是否已经超时
			_debug : false, // 是否测试性能
			_percentWidthRegexp : /.*%.*/g,
			_allButtonsHidden : false,
			_existsStatistics : false, // 是否存在统计信息?
			_columnFields : [],
			_columns : '',
			_currentRowCount : 0,
			_existsMultiHead : false,
			_realColModel : [] // 排除了无用的一级表头的列model
		}; // end of defaults
		
		var opts = $.extend({}, defaults, options);
		opts.width = opts.width + '';
		var dataIndexCache = {}; // 缓存dataIndex的值: {dataIndex:axis}
		var pageNumberCache = {}; // 缓存已加载的页码: {page:true}
		
		var stripesSettings = {}; // 实际的dataIndex对应的样式
		var quantityOfUsedClass = 0; // 当前使用的斑纹条样式
		
		var gdiv = buildGlobalContainer();
		var $gdiv = $(gdiv);
		var hdiv = document.createElement('div');	// 标题栏
		var tdiv = document.createElement('div');	// 工具栏
		var thdiv = document.createElement('div');	// 表格标题区
		var bdiv = document.createElement('div');	// 表格数据区
		var msgdiv = document.createElement('div');	// 处理提示区域
		var statdiv = document.createElement('div');	// 统计栏
		var $statdiv = $(statdiv);
		var pdiv = document.createElement('div');	// 分页栏
		
		var lastSortedTh = null;
		
		var placeHolderSign = $placeholder.attr('id') || $placeholder.attr('name');
		var rpSelectId = 'pager_rp_select_' + placeHolderSign;
		var totalPageInfoHolder = 'total_page_info_holder_' + placeHolderSign;
		var messageTipInfoHolder = 'message_tip_info_holder_' + placeHolderSign;
		var messageTipImageHolder = 'message_tip_image_holder_' + placeHolderSign;
		
		var buttonGroupIdPrefix = 'tinygrid-button-group-';
		
		$placeholder.append(gdiv);
		
		if (opts.showTitle) {
			buildTitleContainer();
			$gdiv.append(hdiv);
		}
		
		$gdiv.append(tdiv);
		buildButtonsContainer();
		
		$gdiv.append(thdiv);
		buildTableHeadContainer();
		buildTableContainer();
		$gdiv.append(bdiv);
		
		buildMessageTipContainer();
		$gdiv.append(msgdiv);
		
		if (opts._existsStatistics) {
			buildStatisticsContainer();
			$gdiv.append(statdiv);
		}
		
		if (opts.usepager || opts.statusBar) {
			buildPagerContainer();
			$gdiv.append(pdiv);
		}
		
		$gdiv.append('<div style="clear:both;"></div>');
		
		addTableContainerScrollEvent();
		
		if ($.browser.msie && $.browser.version < 7) {
			$(bdiv).css({
				'overflow' : 'auto',
				'width' : $gdiv.width()
			});
		}
				
		/**
		 * 自适应高度
		 */
		if (opts.adaptiveHeight) {
			var gridOldPos = 0 ;
			
			$(document).ready(function () {
				gridOldPos =  $(gdiv).offset().top;	
				$(window).resize(function(event){
					var gridNewPos = $(gdiv).offset().top;	
					if (gridNewPos  != gridOldPos)	{
						var diffLager =gridNewPos  - gridOldPos ;
						//adjust the tinygrid height
						if(diffLager < $(bdiv).height()){
							var height = $(bdiv).height() - diffLager;
							tinygrid.setGirdHeight(height);
							gridOldPos = gridNewPos;
						}
					}
				});		
			});
		}	
		
		/**
		 * tinygrid object for exporting
		 */
		var tinygrid = {
			/**
			 * 加载最新的数据
			 * reflushCache 当reflushCache=true时重新读取参数
			 *              当reflushCache=false时读取缓存的参数
			 */
			populate : function(reflushCache) {
				if (opts._loading || !opts.url) {
					return false;
				}
				if (opts.onSubmit) {
					var gh = opts.onSubmit($placeholder);
					if (!gh) {
						return false;
					}
				}
				opts._loading = true;
				var procmsgTip=opts.procmsg;
				$('.pageStat', pdiv).html(procmsgTip);
				
				$('.reload', pdiv).addClass('loading');
				if (opts.showMessageTip) {
					tinygrid.showLoadingMessageTip();
				}
				if (!opts.newp) {
					opts.newp = 1;
				}
				if (opts.page > opts._pages) {
					opts.page = opts._pages;
				}
				var queryTotal=opts.showTotal;
				var param = [
					{name : 'page', value : opts.newp}, 
					{name : 'rp', value : opts.rp}, 
					{name : 'sortname', value : opts.sortname}, 
					{name : 'sortorder', value : opts.sortorder},
					{name : 'showTotal', value : queryTotal},
					{name : 'columns', value : opts._columns}
				];
				if (opts.params) {
					for (var pi = 0, len = opts.params.length; pi < len; pi++) {
						param.push(opts.params[pi]);
					}
				}
				
				opts._startTime = new Date();
				
				if ((opts.total && !opts.cachePageData) || reflushCache) {
					$('tbody', bdiv).empty();
					pageNumberCache = {};
				}
				if (!reflushCache && opts.cachePageData) {
					$('tbody tr', bdiv).hide();
					if (pageNumberCache[opts.newp]) {
						if (opts.showMessageTip) {
							$(bdiv).show();
							$(msgdiv).hide();
						}
						opts._overtime = false;
						opts._loading = false;
						$('.reload', pdiv).removeClass('loading');
						opts.page = opts.newp;
						tinygrid.rebuildPager();
						$('tbody tr[page="' + opts.newp + '"]', bdiv).show();
						return false;
					}
				}
				$.ajax({
					type : opts.method,
					url : opts.url,
					data : param,
					dataType : opts.dataType,
					success : function(data) {
						opts._overtime = false;
						$('.reload', pdiv).removeClass('loading');
						opts._loading = false;
						tinygrid.addData(data);
					},
					error : function(xhr,status,e) {
						opts._overtime = false;
						$('.reload', pdiv).removeClass('loading');
						opts._loading = false;
						try {
							if (opts.onError) {
								opts.onError(xhr,status,e);
							} else {
								var errorCode = xhr.getResponseHeader("Error-TYPE");
							    var errorMsg = decodeURIComponent(xhr.getResponseHeader("Error-CRTS"));
							    if (errorMsg) {
									tinygrid.showErrorMessageTip(errorMsg);
							    }
								var errHeader = "Error-Information";
								var scriptText = xhr.getResponseHeader(errHeader);
								if(scriptText==null||scriptText==""){
									// tinygrid.showErrorMessageTip("数据读取错误！");
									return;
								}
								var errMsg = window["eval"]("(" + scriptText + ")");
								if (!errMsg) {
									return;
								}
								var message = decodeURI(decodeURI(errMsg.message));
								if (opts.onErrorType) {
									opts.onErrorType(errMsg.errorType, message, placeholder);
									return;
								} 
								if (errMsg.errorType == 'timeount') {
									window.alert(message);
									top.reloginFromMainJsp();
								} else {
									tinygrid.showErrorMessageTip(message);
								}
					   		}
						} catch (e) {tinygrid.showErrorMessageTip("数据读取错误！");}
					}
				});
				if (opts.useTimeout) {
					setTimeout(tinygrid.timeoutHandle, opts.timeout * 1000);
				}
			}, // end of populate
			
			addData : function (data) {				
				if (opts.preProcess) {
					data = opts.preProcess(data, placeholder);
				}
				if (!data) {
					tinygrid.showErrorMessageTip();
					return false;
				}
				// dataType is json
				opts.total = data.total;
				if (opts.rp < 1) {
					opts.rp = 1;
				}
				opts._pages = Math.ceil(opts.total/opts.rp);
				if (opts.total == 0) {
					opts._pages = 1;
					opts.page = 1;
					tinygrid.rebuildPager();
					tinygrid.showNoDataMessageTip();
					if (opts.onNoDataReturn) {
						opts._existsStatistics && $statdiv.empty();
						opts.onNoDataReturn(placeholder);
					}
					return false;
				}
				// 对于不设置记录总数 (total=-1) 的情况的处理 add by hwe 20100202
				if (opts.total < 0) {  // 不查总数
					var rowcnt = data.rows.length;
					
					opts._pages = 10000;
					var curPage = data.page;
														
					if (rowcnt < opts.rp) //当前行小于设定行数，说明已经到了最后一页
						opts._pages = curPage;
					if (rowcnt == 0) {   //没有数据 ，则认为该页是最后一页
						opts.page=curPage;
						opts._pages=curPage;
						tinygrid.rebuildPager();
						tinygrid.showNoDataMessageTip();
						if (opts.onNoDataReturn) {
							opts._existsStatistics && $statdiv.empty();
							opts.onNoDataReturn(placeholder);
						}
						return false;					
					}
				}
				
				tinygrid.parseData(data);
				if (opts.showMessageTip) {
					$(bdiv).show();
					$(msgdiv).hide();
				}
				if (opts.onSuccess) {
					opts.onSuccess(placeholder);
				}
				if (opts._debug) {
					window.alert('tinygrid耗时： ' + ((new Date() - opts._startTime) / 1000) + 's');
				}
			}, // end of addData
			
			showInitMessageTip : function() {
				tinygrid._showMessageTip(opts.initmsg, '', '');
			},
			
			showLoadingMessageTip : function() {	
				tinygrid._showMessageTip(opts.procmsg, 'loadingMessageTipClass', '');
			},
			
			_showMessageTip : function(msg, messageTipImageHolderClass, messageTipInfoHolderClass) {
				$('#' + messageTipImageHolder).removeClass().addClass(messageTipImageHolderClass);
				$('#' + messageTipInfoHolder).removeClass().addClass(messageTipInfoHolderClass).html(msg);
				$(bdiv).hide();
				if($(bdiv)[0].style.height) {
					$(msgdiv).height($(bdiv)[0].style.height).show();
				} else {
					$(msgdiv).height($(bdiv).height()).show();
				}
			},
			
			showErrorMessageTip : function(message) {
				$('.pageStat', pdiv).html('');
				tinygrid._showMessageTip('<em style="color:#A25A66;">' + (message || opts.errormsg) + '</em>', '', classNames.errorMessageTipClass);
			},
			
			showNoDataMessageTip : function() {
				$('.pageStat', pdiv).html(opts.nomsg);
				tinygrid._showMessageTip(opts.nomsg, '', classNames.errorMessageTipClass);
			},
			
			/**
			 * 清空表格的数据
			 */
			clearData : function() {
				$('tbody', bdiv).empty();
				opts._currentRowCount = 0;
				pageNumberCache = {};
			},
			
			parseData : function (data) {
				var rows = [];
				opts.page = +data.page;
				rows = data.rows;
				
				var rowDatas=[];
				
				var html = tinygrid.buildTableTrByRowsData(rows, opts._currentRowCount);
				opts._currentRowCount += rows.length;
				
				$('tbody', bdiv).append(html);  
				
				tinygrid.addTableTrEvent();
				tinygrid.rebuildPager();
				
				opts.cachePageData && (pageNumberCache[opts.page] = true);
			},
			
			buildTableTrByRowsData : function(rows, fromRowIndex) {
				var html = '';
				if (!rows || rows.length == 0) {
					return html;
				}
				var groupByDataIndex = null;
				var lenOfClasses = 0;
				if (opts.stripes) {
					groupByDataIndex = opts.stripes.groupBy;
					var classes = opts.stripes.classes;
					if (!classes || classes.length == 0) {
						opts.stripes.classes = [];
						opts.stripes.classes.push(classNames.evenRowClass);
						opts.stripes.classes.push(classNames.oddRowClass);
						lenOfClasses = 2;
					} else if (classes.length == 1) {
						opts.stripes.classes.push(classNames.oddRowClass);
						lenOfClasses = 2;
					} else {
						lenOfClasses = opts.stripes.classes.length;
					}
				}
				var statistics = {}; // 统计结果
				// 累计值
				var accumulationCells = {}; // [dataIndex:[cellvalue]]
				$.each(rows, function(rowIndex, row) {
					var rowIndex = ++fromRowIndex;
					var trId = placeHolderSign + '_row_' + rowIndex;
					var trHtml = '<tr';
					trHtml += ' id = "' + trId + '"';
					trHtml += ' class="{rowClassPlaceHolder}"';
					trHtml += ' rowIndex="' + (rowIndex) + '"';
					trHtml += ' page="' + (opts.page || '1') + '"';
					trHtml += '>';
					var rowClass = opts.striped ? ((rowIndex % 2 == 0) ? classNames.evenRowClass : classNames.oddRowClass) : '';
					
					// 缓存dataIndexs数据
					var dataIndexs = {};
					var cellRenderer2Models = {} // {dataIndex:model};
					for (var cellIndex = 0, len = opts._realColModel.length; cellIndex < len; cellIndex++) {
						var model = opts._realColModel[cellIndex];
						if (!model) {
							return true;
						}
						var hide = model.hide;
						var lineBreak = model.lineBreak;
						var showTip = model.showTip;
						var innertext = model.field ? row[model.field] : null;
						innertext = innertext || '';
						dataIndexs[model.dataIndex] = innertext;
						if (opts.stripes && groupByDataIndex == model.dataIndex) {
							if (innertext in stripesSettings) {
								rowClass = stripesSettings[innertext];
							} else {
								rowClass = opts.stripes.classes[(quantityOfUsedClass++) % lenOfClasses];
								stripesSettings[innertext] = rowClass;
							}
						}
						if (model.rowClassRenderer && $.isFunction(model.rowClassRenderer)) {
							var classRenderer = model.rowClassRenderer(innertext, rowIndex);
							if (classRenderer) {
								rowClass = classRenderer;
							}
						}
						if (model.cellRenderer && $.isFunction(model.cellRenderer)) {
							innertext = model.cellRenderer(innertext, trId);
						}
						if (model.cellRenderer2 && $.isFunction(model.cellRenderer2)) {
							cellRenderer2Models[model.dataIndex] = model;
							innertext = '#{' + model.dataIndex + '}'
						}
						trHtml += '<td dataIndex="' + model.dataIndex + '" cellIndex="' + cellIndex + '" style="';
						if (hide) {
							trHtml += 'display : none;';
						}
						if (model.align && model.align != 'left') {
							trHtml += 'padding-left : 0px;';
						}
						trHtml += '">';
						trHtml += '<div style="width:' + model.width
							 + 'px;text-align:' + model.align + ';'
							 + (lineBreak ? '' : 'overflow:hidden; text-overflow:ellipsis; white-space:nowrap;') + '"'
							 + (model.cellClass ? (' class="' + model.cellClass + '"') : '')
							 + (showTip ? (' title="' 
							 + 					(model.cellRenderer2 
								 				? ('%{' + model.dataIndex + '}')
								 				: $.getTextFromHtml(innertext)) 
							 			   	+ '"') 
							 			: '') + '>';
						if (model.editable) {
							trHtml += '<input type="text" class="' + classNames.editableClass + ' '
									+ classNames.editableClass + '-' + (model.align ? model.align : 'right') + '"'
									+ ' value="' + innertext + '" />';
						} else {
							trHtml += innertext;
						}
						trHtml += '</div>';
						trHtml += '</td>';
						if (model.countable) {
							if (!statistics[model.dataIndex]) {
								statistics[model.dataIndex] = {
									'value' : 0,
									'precision' : 0
								};
							}
							var statValue = $.getTextFromHtml(innertext);
							if (statValue && statValue.indexOf('.') > -1) {
								statistics[model.dataIndex].value += parseFloat(statValue) || 0;
								statistics[model.dataIndex].precision = model.precision || opts.defaultPrecision;
							} else {
								statistics[model.dataIndex].value += parseInt(statValue) || 0;
								statistics[model.dataIndex].precision = statistics[model.dataIndex].precision || 0;
							}
						}
					}
					trHtml += '</tr>';	
					for (var dataIndex in cellRenderer2Models) {
						var cellRenderer2 = cellRenderer2Models[dataIndex].cellRenderer2;
						var model = cellRenderer2Models[dataIndex];
						if (model.accumulation) {
							if (!accumulationCells[dataIndex]) {
								accumulationCells[dataIndex] = [];
							}
						}
						var cellValues = accumulationCells[dataIndex];
						var celltext = cellRenderer2(dataIndexs, trId, cellValues);
						trHtml = trHtml.replace("#{" + dataIndex + "}", celltext);
						trHtml = trHtml.replace("%{" + dataIndex + "}", $.getTextFromHtml(celltext));
						if (model.accumulation) {
							cellValues.push($.getTextFromHtml(celltext));
						}
					}
					html += trHtml.replace("{rowClassPlaceHolder}", rowClass);
				});
				buildStatisticsResult(statistics);
				return html;
			},
			
			addTableTrEvent : function () {
				var $trs = $('tbody tr', bdiv);
				var $checkboxs = $('td:first-child :checkbox', $trs).not(':disabled');
				// 勾选checkbox或radio
				$trs.click(function(e) {			
					var inputTag = $(e.target).prop('tagName').toUpperCase();	
					var $checkbox = $('td:first-child :checkbox', $(this)).not(':disabled');
					var $radio = $('td:first-child :radio', $(this)).not(':disabled');
					if (inputTag == 'A') { // 超链接
						e.stopPropagation(); // 不进行冒泡
						return;
					}
					if ($checkbox.length > 0 && opts.rowClickToDoTick && inputTag != 'INPUT') { // 通过tr打勾
						if (opts.rowClickJustCheckOne) {
							$checkboxs.prop('checked', false);
							$trs.removeClass(classNames.selectedClass).attr("selected",false);
						}
						if ($checkbox.prop('checked')) {
							$checkbox.prop('checked', false);
							$(this).removeClass(classNames.selectedClass).attr("selected",false);
						} else {
							$checkbox.prop('checked', true);
							$(this).addClass(classNames.selectedClass).attr("selected",true);
						}
					}
					if ($radio.length > 0 && opts.rowClickToDoTick) { // 通过tr打勾/通过radio打勾
						$radio.prop('checked', true);
						$('tbody tr', bdiv).removeClass(classNames.selectedClass).attr("selected", false);
						$(this).addClass(classNames.selectedClass).attr("selected", true);
					}
					if ($checkbox.length > 0 && inputTag == 'INPUT') { // 通过checkbox打勾
						if ($checkbox.prop('checked')) {
							$(this).addClass(classNames.selectedClass).attr("selected",true);
						} else {
							$(this).removeClass(classNames.selectedClass).attr("selected",false);
						}
					}
//					if (($checkbox.length + $radio.length) == 0) { // 不存在checkbox/radio情况下
//						$(this).toggleClass(classNames.selectedClass);
//						$(this).add("selected",$(this).hasClass(classNames.selectedClass));
//					}
				});
				// 单击事件
				if (opts.onRowClick) {
					$trs.click(function(e) {
						opts.onRowClick(this, placeholder);
					});
				}
				// 双击事件
				if (opts.onRowDblClick) {
					$trs.dblclick(function(e) {
						opts.onRowDblClick(this, placeholder);
					});
				}
				
				if ($.browser.msie && $.browser.version < 7) { // ie6下的样式
					$trs.hover(function(e) {
						$(this).addClass('trhover');
					}, function(e) {
						$(this).removeClass('trhover');
					});
					$('tbody td', bdiv).hover(function(e) {
						$(this).addClass('tdhover');
					}, function(e) {
						$(this).removeClass('tdhover');
					});
				}
			},
			
			rebuildTableHeader : function() {
			  	$('table', thdiv).empty();
				buildTableHeader();
			},
			
			rebuildPager : function () { //rebuild pager based on new properties
				$('.pcontrol input', pdiv).val(opts.page);	
				var stat = opts.pagestat.replace(/{total}/, opts.total);
				if (opts.showTotal) {
					$('#' + totalPageInfoHolder).html(opts._pages);
					$('.pageStat', pdiv).html(stat);
				} else {
					var message=opts.messageWhenHideTotal;
					
					$('.pageStat', pdiv).html(message);
				}
			},
			
			timeoutHandle : function() {
				if (opts._overtime) {
					if (opts.onTimeout) {
						opts.onTimeout(placeholder);
					} else {
						window.alert('超时！超时设置为：' + opts.timeout + 's');
					}
				}
			},
			
			/**
			 * 取得当前的总记录数
			 */
			getTotal : function() {
				return +opts.total;
			},
			
			/**
			 * 得到该页的所有行
			 */
			getAllRows : function() {
				return $('tbody tr', bdiv);
			},
			
			/**
			 * 得到被选中的行 <br>
			 * 若有checkbox/radio则根据打勾进行选择<br>
			 * 否则，根据selectedClass的样式定位被选中的行
			 * 
			 * @param {Boolean=} leaveDisabledAlone 默认false
			 */
			getSelectedRows : function(/*optional*/leaveDisabledAlone) {
				var checkboxs = $('td:first-child :checkbox,td:first-child :radio', bdiv);
				if (!leaveDisabledAlone) {
					checkboxs = checkboxs.not(':disabled');
				}
				if (checkboxs.length != 0) {
					return $('td:first-child :checkbox:checked,td:first-child :radio:checked', bdiv).parent().parent().parent('tr');
				}
				return $('.' + classNames.selectedClass, bdiv);
			},
			
			/**
			 * 得到被选中的行中的某一些单元格的值
			 */
			getSelectedCellValues : function (/*dataIndexs*/) {
				var values = [];
				var dataIndexs = arguments;
				if (arguments.length == 0) {
					return values;
				}
				if ($.isArray(arguments[0])) {
					dataIndexs = arguments[0];
				}
				return tinygrid.getCellValuesInSpecifiedRows(tinygrid.getSelectedRows(), dataIndexs);	
			},
			
			/**
			 * 得到指定的行中的某一些单元格的值
			 * 
			 * @param {Array}
			 *            rows 指定的行
			 * @param {Array}
			 *            dataIndexs 指定的单元格
			 * @return {Array} 指定行中的单元格值对象[{dataIndex:value}]
			 */
			getCellValuesInSpecifiedRows : function(rows, dataIndexs) {
				var undefinedValue;
				var values = [];
				$.each(rows, function(i, row) {
					var valueObj = {};
					valueObj['grid_row_index'] = $(row).attr('rowIndex');
					for (var index = 0, len = dataIndexs.length; index < len; index++) {
						var dataIndex = dataIndexs[index];
						if (dataIndex in dataIndexCache) {
							var text = null;
							var $input = $('td[dataIndex="' + dataIndex + '"] :input', row);
							if ($input.length > 0) {
								text = $input.val();
							} else {
								text = $('td[dataIndex="' + dataIndex + '"]', row).text();
							}
							valueObj[dataIndex] = text;
						} else {
							valueObj[dataIndex] = undefinedValue;							
						}
					}
					values.push(valueObj);
				});
				return values;	
			},
			
			/**
			 * 设置指定的行中的某一些单元格的值
			 * 
			 * @param {Array}
			 *            rows 指定的行
			 * @param {Object|Array} 指定行中的单元格值对象{dataIndex:value}|[{dataIndex:value}]
			 */
			setCellValuesInSpecifiedRows : function(rows, dataIndexValues) {
				var dataIndexValuesArray = [];
				if ($.isArray(dataIndexValues)) {
					dataIndexValuesArray = dataIndexValues;
				} else {
					dataIndexValuesArray.push(dataIndexValues);
				}
				var defaultDataIndexValues = dataIndexValuesArray[0];
				$.each(rows, function(i, row) {
					var _dataIndexValues = dataIndexValuesArray[i] || defaultDataIndexValues;
					for (var dataIndex in _dataIndexValues) {
						var value = _dataIndexValues[dataIndex];
						if (dataIndex in dataIndexCache) {
							var $td = $('td[dataIndex="' + dataIndex + '"] div', row);
							var $input = $('td[dataIndex="' + dataIndex + '"] :input', row);
							if ($input.length == 0) {
								$td.text(value);
							} else {
								$input.val(value);
							}
						}
					}
				});
			},
			
			/**
			 * 得到所有行中的某一些单元格的值
			 * 
			 * @param {Array}
			 *            dataIndexs 指定的单元格
			 * @return {Array} 指定行中的单元格值对象[{dataIndex:value}]
			 */
			getCellValuesInAllRows : function(dataIndexs) {
				return tinygrid.getCellValuesInSpecifiedRows(tinygrid.getAllRows(), dataIndexs);
			},
			
			hideColumns : function(/*dataIndexs*/) {
				var dataIndexs = arguments;
				if (arguments.length == 0) {
					return false;
				}
				if ($.isArray(arguments[0])) {
					dataIndexs = arguments[0];
				}
				for (var index = 0, len = dataIndexs.length; index < len; index++) {
					$('table tr th[dataIndex="' + dataIndexs[index] + '"]', gdiv).hide();
					$('table tr td[dataIndex="' + dataIndexs[index] + '"]', gdiv).hide();
				}
			},
			
			showColumns : function(/*dataIndexs*/) {
				var dataIndexs = arguments;
				if (arguments.length == 0) {
					return false;
				}
				if ($.isArray(arguments[0])) {
					dataIndexs = arguments[0];
				}
				for (var index = 0, len = dataIndexs.length; index < len; index++) {
					$('table tr th[dataIndex="' + dataIndexs[index] + '"]', gdiv).show();
					$('table tr td[dataIndex="' + dataIndexs[index] + '"]', gdiv).show();
				}
			},
			
			changeHeader : function(dataIndex, header) {
				$('table tr th[dataIndex="' + dataIndex + '"] div', gdiv).html(header);
			},
			
			setGirdHeight :function(height){
				$(bdiv).height(height);
				$(msgdiv).height(height);
			},
			
			changeSort : function(dataIndex, sortorder) {
				var $th = $('table tr th[dataIndex="' + dataIndex + '"]', gdiv);
				changeSort($th[0], false, sortorder);
			}			
		}; // end of tinygrid object
		
		//make tinygrid functions accessible
		placeholder.opts = opts;
		placeholder.tinygrid = tinygrid;
		if (opts.autoload) {
			tinygrid.populate();
		} else if (opts.initmsg) {
			tinygrid.showInitMessageTip();	
		}
		
		
		//-------------------------------------------------------
		//------------ some private functions -------------------------
		/**
		 * 创建全局tinygrid的div容器
		 */
		function buildGlobalContainer() {
			var gdiv = document.createElement('div');
			gdiv.className = classNames.globalContainerClass;
			if (opts.width != 'auto' && !opts.width.match(opts._percentWidthRegexp)) {
				gdiv.style.width = opts.width + 'px';
			} else if (opts.width.match(opts._percentWidthRegexp)) {
				gdiv.style.width = opts.width;
			}
			return gdiv;
		}
		
		function buildTitleContainer() {
			hdiv.className = classNames.titleContainerClass;
			var $hdiv = $(hdiv);
			var title = '<div class="' + classNames.titleClass + '"><span>'
					+ (opts.title ? opts.title : '') + '</span></div>';
			
			$hdiv.append(title);
		}
		
		/**
		 * 创建按钮区域
		 */
		function buildButtonsContainer() {
			if (isNoneButton()) {
				return false;
			}
			
			var leftAndRightButtons = getLeftAndRightButtons();
			var leftButtons = leftAndRightButtons[0], rightButtons = leftAndRightButtons[1];

			tdiv.className = classNames.buttonContainerClass;
			var bdivLeft = document.createElement('div');
			bdivLeft.className = classNames.innerContainer;
			var $bdivLeft = $(bdivLeft);
			
			var bdivRight = document.createElement('div');
			bdivRight.className = classNames.innerContainer4Right;
			var $bdivRight = $(bdivRight);
			
			var leftAllBtnHidden = buildButtonsInnerContainer(leftButtons, $bdivLeft);
			var rightAllBtnHidden = buildButtonsInnerContainer(rightButtons, $bdivRight);

			opts._allButtonsHidden = leftAllBtnHidden && rightAllBtnHidden
					&& opts.customizeButtonHtml == '';
			
			var $tdiv = $(tdiv);
			if (opts.hideToolbar || opts._allButtonsHidden) {
				$tdiv.hide();
			}
			$tdiv.append(bdivLeft);
			$tdiv.append(bdivRight);
			$tdiv.append(opts.customizeButtonHtml);
			$tdiv.append('<div style="clear : both;"></div>');
			
			addShowOrHideButtonGroupEvent(bdivLeft);
			addShowOrHideButtonGroupEvent(bdivRight);
		} // end of buildButtonsContainer
		
		function getLeftAndRightButtons() {
			if (!opts.buttons) {
				return [[], []];
			}
			var leftButtons = [], rightButtons = [];
			if ($.isArray(opts.buttons)) {
				leftButtons = opts.buttons;
			} else {
				leftButtons = opts.buttons['left'] || [];
				rightButtons = opts.buttons['right'] || [];
			}
			return [leftButtons, rightButtons];
		}
		function isNoneButton() {
			var leftAndRightButtons = getLeftAndRightButtons();
			var leftButtons = leftAndRightButtons[0], rightButtons = leftAndRightButtons[1];
			return leftButtons.length + rightButtons.length == 0 && opts.customizeButtonHtml == '';
		}
		
		// 返回: 是否所有按钮隐藏?
		function buildButtonsInnerContainer(buttons, $container) {
			if (!buttons || buttons.length == 0) {
				return true;
			}
			var allButtonHidden = true;
			for (var i = 0, len = buttons.length; i < len; i++) {
				var btn = buttons[i];
				if (!btn) {
					continue;
				}
				if (allButtonHidden && !btn.hide) {
					allButtonHidden = false;
				}
				var item = '';
				if (btn.group) {
					item = createButtonGroup(btn);
				} else {
					item = createNormalButton(btn, false);
				}
				$container.append(item);
			} // end of for
			return allButtonHidden;
		}
		
		/**
		 * 创建按钮群DIV DOM
		 * 
		 * @param {Object}
		 *            grp 按钮群设置信息
		 * @return {DOM} 按钮群DIV DOM
		 */
		function createButtonGroup(grp) {
			if (!grp.group || grp.group.length == 0) {
				return '';
			}
			var grpDiv = document.createElement('div');
			grpDiv.className = classNames.buttonGroupClass;
			grpDiv.id = grp.id;
			$(grpDiv).attr('group', 'true');
			if (grp.tip) {
				grpDiv.title = grp.tip;
			}
			grpDiv.innerHTML = "<div><span>"+grp.name+"</span></div>";
			if (grp.gclass) {
				$('span', grpDiv).addClass(grp.gclass).css({paddingLeft:20});
			}
			var btnList = createButtonListForGroup(grp.id, grp.group);
			
			btnList.style.position = 'absolute';
			
			$(grpDiv).mousemove(function () {
				$(btnList).css("left", $(this).offset().left);					
				$(btnList).css("top", $(this).height() + $(hdiv).height() + 8);				
			});
			
			$gdiv.append(btnList);
			return grpDiv;
		}
		
		function createButtonListForGroup(groupId, group) {
			var btnsDiv = document.createElement('div');
			btnsDiv.className = classNames.buttonGroupContainerClass;
			btnsDiv.style.display = 'none';
			btnsDiv.style.zIndex = '999';
			
			btnsDiv.id = buttonGroupIdPrefix + groupId;
			var $btnsDiv = $(btnsDiv);
			for (var i = 0, len = group.length; i < len; i++) {
				$btnsDiv.append(createNormalButton(group[i], true));
			}
			$(btnsDiv).bind('mouseleave.tinygrid', function(evt) {
				hideDropdownMenu(groupId);
			});
			return btnsDiv;
		}
		
		function addShowOrHideButtonGroupEvent(context) {
			$('> div[group]', context).bind('click.tinygrid', function(evt) {
				hideAllDropdownMenu();
				showDropdownMenu(evt, this.id);
			}).bind('mouseenter.tinygrid', function(evt) {
				hideAllDropdownMenu();
				showDropdownMenu(evt, this.id);
			});
			$('> div[buttonItem]', context).bind('mouseenter.tinygrid', function(evt) {
				hideAllDropdownMenu();
			});
			return false;
		}
		
		/**
		 * 显示下拉菜单
		 */
		function showDropdownMenu(evt, groupId) {
			var $menu = $('#' + buttonGroupIdPrefix + groupId);
			if ($menu.is(':visible')) {
				return false;
			}
			var $trigger = $('#' + groupId);
			$menu.show();
			$menu.css({
				display : 'block'
			});
		}
		
		/**
		 * 隐藏下拉菜单
		 */
		function hideDropdownMenu(groupId) {
			var menuDom = document.getElementById(buttonGroupIdPrefix + groupId);
			menuDom.style.display = 'none';
		}
		function hideAllDropdownMenu() {
			$('div[id^="' + buttonGroupIdPrefix + '"]').hide();
		}
		
		/**
		 * 创建按钮DIV DOM
		 * 
		 * @param {Object}
		 *            btn 按钮设置信息
		 * @param {Boolean}
		 *            isGroupItem 是否是按钮群里的按钮
		 * @return {DOM} 按钮DIV DOM
		 */
		function createNormalButton(btn, isGroupItem) {
			var undefined;
			if (btn.html !== undefined) {
				return createNormalHtml4Toolbar(btn);
			}
			var btnDiv = document.createElement('div');
			if (isGroupItem) {
				btnDiv.className = classNames.buttonGroupItemClass;
			} else {
				btnDiv.className = classNames.buttonItemClass;
			}
			var $btnDiv = $(btnDiv);
			$btnDiv.attr('buttonItem', 'true');
			if (btn.id) {
				btnDiv.id = btn.id;
			}
			if (btn.tip) {
				btnDiv.title = btn.tip;
			}
			btnDiv.innerHTML = '<div><span class="' + classNames.buttonSpanClass + '">'+btn.name+'</span></div>';
			if (btn.bclass) {
				$('span', btnDiv).addClass(btn.bclass);
			}
			if (btn.hide) {
				$btnDiv.css('display', 'none');
			}
			btnDiv.onpress = btn.onpress;
			btnDiv.name = btn.name;
			if (!btn.disabled && btn.onpress) {
				$btnDiv.click(function () {
					if ($.isFunction(this.onpress)) {
						this.onpress(this.name, placeholder, this.id);
					} else { 
						eval(this.onpress + '(this.name, placeholder, this.id);');
					}
				});
			} 
			if ($.browser.msie && $.browser.version < 7.0) { // 为了适应变态的IE6
				$btnDiv.hover(function() {
					$(this).addClass('hover');
				}, function() {
					$(this).removeClass('hover');
				});
			}
			return btnDiv;
		}
		
		function createNormalHtml4Toolbar(btn) {
			var normalDiv = document.createElement('div');
			var $normalDiv = $(normalDiv);
			if (btn.id) {
				normalDiv.id = btn.id;
			}
			if (btn.tip) {
				normalDiv.title = btn.tip;
			}
			$normalDiv.addClass(classNames.toolbarItemClass);
			if (btn.bclass) {
				$normalDiv.addClass(btn.bclass);
			}
			normalDiv.innerHTML = btn.html;
			return normalDiv;
		}
		
		/**
		 * 创建表格数据区
		 */
		function buildTableContainer() {
			bdiv.className = classNames.tableContainerClass;
			bdiv.align = 'left';
			
			var bdivH = calculateTableBodyHeight();
			
			opts.height = (opts.height == 'auto' ? 'auto' : parseInt(bdivH));
			
			bdiv.style.height = bdivH;
			var table = document.createElement('table');
			$(table).attr('cellspacing', '0').attr('cellpadding', '0').append(document.createElement('tbody'));
			$(bdiv).append(table);
			if (opts.height == 'auto') {
				var blank = '<div style="height:15px;">&nbsp;</div>';
				$(bdiv).append(blank);
			}
		}
		
		function calculateTableBodyHeight() {
			var bdivH = 0;
			if(opts.height == 'auto') {
				bdivH = 'auto'
			} else {
				bdivH = opts.height;
				if (opts.showTitle) {
					bdivH = bdivH - heights.title;
				}
				if (!opts._allButtonsHidden && !isNoneButton()) {
					bdivH = bdivH - heights.toolbar;
				}
				if (opts.colModel) {
					bdivH = bdivH - heights.tableHead;
					if (opts._existsMultiHead) {
						bdivH = bdivH - heights.tableHead;
					}
				}
				if (opts._existsStatistics) {
					bdivH = bdivH - heights.statistics;
				}
				if(opts.usepager || opts.statusBar) {
					bdivH = bdivH - heights.pager;
				}
				//避免出现<0的结果
				bdivH = (bdivH > 0 ? bdivH : 0) + 'px';
			}
			return bdivH; // 上下边框
		}		
		
		/**
		 * 创建表格标题区
		 */
		function buildTableHeadContainer() {
			thdiv.className = classNames.tableHeadContainerClass;
			if (!opts.showTitle && (!opts.buttons || opts.buttons.length == 0)) {
				thdiv.className += ' ' + classNames.noBorderTop;
			}
			thdiv.cellspacing = 0;
			thdiv.cellpadding = 0;
			var box = document.createElement('div');
			box.className = 'box';
			$(thdiv).append(box);
			var table = document.createElement('table');
			$(table).attr('cellspacing', '0').attr('cellpadding', '0');
			$(box).append(table);
			buildTableHeader();
		} // end of buildTableContainer
		
		function buildTableHeader() {
			if (opts.colModel) {
				opts._existsMultiHead = existsMultiTableHead();
				if (opts.widthPercentSupport) {
					calculateDynamicColWidth();
				}
				
				var thead = document.createElement('thead');
				var firstTr = document.createElement('tr');
				var secondTr = document.createElement('tr');
				
				buildFirstAndSecondTableHeadHr(firstTr, secondTr);
				$(thead).append(firstTr);
				if (opts._existsMultiHead) {
					$(thead).append(secondTr);
				}
				
				$('table', thdiv).prepend(thead);

				addTableHeadEvent(thdiv);
				
				opts._columns = opts._columnFields.join(',');
			} // end if opts.colmodel
		}
		
		function buildFirstAndSecondTableHeadHr(firstTr, secondTr) {
			opts._columnFields = [];
			var $firstTr = $(firstTr);
			for (var i = 0, len = opts.colModel.length; i < len; i++) {
				var cm = opts.colModel[i];
				var existsChildren = cm.children && cm.children.length > 0;
				var rowspan = opts._existsMultiHead ? (existsChildren ? 1 : 2) : 1;
				var colspan = existsChildren ? cm.children.length : 1;
				
				var width = cm.width;
				if (existsChildren) {
					buildSecondClassTableHeadTr(secondTr, cm.children);
					width = sumChildrenWidth(cm.children);
				} else {
					dataIndexCache[cm.dataIndex] = i
					opts._realColModel.push(cm);
				}
	
				$firstTr.append(createTableHeadTh(cm, i, width, rowspan, colspan));
			} // end of for
		}
		
		function sumChildrenWidth(children) {
			var width = 0;
			for (var i = 0, len = children.length; i < len; i++) {
				var cm = children[i];
				width += parseInt(cm.width);
			} // end of for
			return width;
		}
		
		function createTableHeadTh(cm, axis, width, rowspan, colspan) {
			var th = document.createElement('th');
			var $th = $(th);
			$th.attr('dataIndex', cm.dataIndex || '').attr('sortable', !!cm.sortable)
			$th.attr('axis', axis).attr('leaf', 'true');
			$th.attr('rowspan', rowspan).attr('colspan', colspan);
			if (colspan > 1) {
				$th.addClass('multicol');
			}
			if (cm.field && $.inArray(cm.field, opts._columnFields) < 0) {
				opts._columnFields.push(cm.field);
			}
			if (cm.countable) {
				opts._existsStatistics = true; // 存在统计栏
			}
			var div = '<div style="';
			cm.align = cm.align ? cm.align : 'left';
			th.align = cm.align;
			if (th.align != 'left') {
				$th.css('padding-left', '0px');
			}
			div += 'text-align: ' + cm.align + ';';
			cm.width = width ? $.getGreaterNum(width, opts.minwidth) : opts.minwidth;
			div += 'width: ' + cm.width + 'px;';
			div += 'overflow:hidden; text-overflow:ellipsis; white-space:nowrap;'; // 过长的文字隐藏
			div += '"'; // end of div style
			div += cm.cellClass ? (' class="' + cm.cellClass + '"') : '';
			
			cm.hide = cm.hide || false;

			$th.attr('hide', !!cm.hide);
			if (cm.hide) {
				th.style.display = 'none';
			}
			if (cm.sortable && opts.sortname
					&& cm.dataIndex == opts.sortname) {
				lastSortedTh = th;
				$th.addClass(classNames.sortedClass);
				if (opts.sortorder && opts.sortorder == 'asc') {
					div += ' class="' + classNames.ascClass + '"';
				}
				if (opts.sortorder && opts.sortorder == 'desc') {
					div += ' class="' + classNames.descClass + '"';
				}
			} // end of div class setting
			div += '> '; // end of div start tag
			div += cm.header + '</div>';
			$th.html(div);
			
			return th;
		}
		
		function buildSecondClassTableHeadTr(secondTr, children) {
			var colModelLen = opts.colModel.length;
			var $secondTr = $(secondTr);
			for (var i = 0, len = children.length; i < len; i++) {
				var cm = children[i];
				dataIndexCache[cm.dataIndex] = colModelLen + i;
				opts._realColModel.push(cm);
				$secondTr.append(createTableHeadTh(cm, colModelLen + i, cm.width, 1, 1));
			} // end of for
		}
		
		function existsMultiTableHead() {
			for (var i = 0, len = opts.colModel.length; i < len; i++) {
				var cm = opts.colModel[i];
				if (cm.children && cm.children.length > 0) {
					return true;
				}
			}
			return false;
		}
		
		function calculateDynamicColWidth() {
			var blankSpaceWidth = calculateBlankSpaceWidth();
			calculateColPercentWidth(blankSpaceWidth);
		}
		function calculateBlankSpaceWidth() {
			var tableWidth = $(thdiv).width() - $('.box', thdiv).outerWidth(true);
			var blankSpaceWidth = tableWidth;
			for (var i = 0, len = opts.colModel.length; i < len; i++) {
				var cm = opts.colModel[i];
				if (cm.hide) {
					continue;	
				}
				cm.width = cm.width ? $.getGreaterNum(cm.width, opts.minwidth) : opts.minwidth;
				if (cm.children && cm.children.length > 0) {
					for (var j = 0, clen = cm.children.length; j < clen; j++) {
						var ccm = cm.children[j];
						if (ccm.hide) {
							continue;	
						}
						ccm.width = ccm.width ? $.getGreaterNum(ccm.width, opts.minwidth) : opts.minwidth;
						blankSpaceWidth = blankSpaceWidth - ccm.width - opts.cellBorderWidth;
					} 
				} else {
					blankSpaceWidth = blankSpaceWidth - cm.width - opts.cellBorderWidth;
				}
			}	
			var reservedBlank = 10;
			return blankSpaceWidth - reservedBlank;
		}
		function calculateColPercentWidth(blankSpaceWidth) {
			if (blankSpaceWidth <= 0) {
				return;
			}
			for (var i = 0, len = opts.colModel.length; i < len; i++) {
				var cm = opts.colModel[i];
				if (cm.children && cm.children.length > 0) {
					for (var j = 0, clen = cm.children.length; j < clen; j++) {
						var ccm = cm.children[j];
						if (ccm.percent) {
							var ccmWidth = ccm.width + blankSpaceWidth * ccm.percent;
							ccm.width = $.getGreaterNum(ccmWidth, opts.minwidth);
						}
					} 
				} else if (cm.percent) {
					var cmWidth = cm.width + blankSpaceWidth * cm.percent;
					cm.width = $.getGreaterNum(cmWidth, opts.minwidth);
				}
			}	
		}
		
		function addTableHeadEvent(thdiv) {
			$.each($('th', $(thdiv)), function(i, th) {
				if ($(th).attr('sortable') == 'sortable') {
					$(th).hover(
						function() {
							if (opts.sortname == $(th).attr('dataIndex')) {
								if (opts.sortorder == 'asc') {
									$('div', $(th)).removeClass().addClass(classNames.descClass);
								} else {
									$('div', $(th)).removeClass().addClass(classNames.ascClass);
								}
							} else {
								var sortOrderClass = opts.defaultSortOrderWhenClicked == 'asc' ? classNames.ascClass : classNames.descClass;
								$('div', $(th)).addClass(sortOrderClass);
							}
						},
						function() {
							if (opts.sortname == $(th).attr('dataIndex')) {
								if (opts.sortorder == 'asc') {
									$('div', $(th)).removeClass().addClass(classNames.ascClass);
								} else {
									$('div', $(th)).removeClass().addClass(classNames.descClass);
								}
							} else {
								var sortOrderClass = opts.defaultSortOrderWhenClicked == 'asc' ? classNames.ascClass : classNames.descClass;
								$('div', $(th)).removeClass(sortOrderClass);
							}
						}
					);	// end of hover
					$(th).click(function(e) {
						changeSort(this, true);
					});
				}
			});
		}
		
		function changeSort(th, autoPopulate, sortorder) {
			if (opts.sortname == $(th).attr('dataIndex')) {
				if (opts.sortorder == 'asc') {
					$('div', $(th)).removeClass().addClass(classNames.descClass);
					opts.sortorder = 'desc';
				} else {
					$('div', $(th)).removeClass().addClass(classNames.ascClass);
					opts.sortorder = 'asc';
				}
			} else {
				if (lastSortedTh) {
					$(lastSortedTh).removeClass(classNames.sortedClass);
					$('div', lastSortedTh).removeClass();
				}
				lastSortedTh = th;
				opts.sortname = $(th).attr('dataIndex');
				opts.sortorder = sortorder || opts.defaultSortOrderWhenClicked;
				var sortorderclass = opts.sortorder == 'asc' ? classNames.ascClass : classNames.descClass;
				$(th).addClass(classNames.sortedClass);
				$('div', $(th)).addClass(sortorderclass);
			}
			if (opts.onChangeSort) {
				opts.onChangeSort(opts.sortname, opts.sortorder, placeholder);
			} else {
				autoPopulate && tinygrid.populate();
			}
		}
		
		/**
		 * 创建信息提示区
		 */
		function buildMessageTipContainer() {
			msgdiv.className = classNames.messageTipContainerClass;
			msgdiv.style.height = calculateTableBodyHeight();
			msgdiv.style.display = 'none';
			var height = $.getGreaterNum(calculateTableBodyHeight(), opts.minheight);
			var blankDiv = document.createElement('div');
			blankDiv.innerHTML = '&nbsp;<br/>&nbsp;';
			blankDiv.style.paddingTop = (height / 3 ) + 'px';
			var div = document.createElement('div');
			div.className = 'messageGroupContainerClass';
			var imageDiv = document.createElement('div');
			imageDiv.id = messageTipImageHolder;
			$(imageDiv).css('float', 'left');
			var infoDiv = document.createElement('div');
			infoDiv.id = messageTipInfoHolder;
			$(infoDiv).css('float', 'left');
			$(div).append(imageDiv).append(infoDiv);
			$(msgdiv).empty().append(blankDiv).append(div);
		}
		
		function buildStatisticsContainer() {
			statdiv.className = classNames.statisticsContainerClass;
			buildStatisticsResult();
		}
		
		function buildStatisticsResult(statistics) {
			var undefined;
			var table = document.createElement('table');
			$(table).attr('cellspacing', '0').attr('cellpadding', '0');
			var thead = document.createElement('thead');
			var $thead = $(thead);
			var ths = '';
			for (var index = 0, len = opts._realColModel.length; index < len; index++) {
				var cm = opts._realColModel[index];
				
				cm.align = cm.align ? cm.align : 'left';
				ths += '<th dataIndex="' + (cm.dataIndex || '') + '" align="' + cm.align + '" style="';
				cm.hide = cm.hide || false;
				if (cm.hide) {
					ths += 'display:none;';
				}
				if (cm.align != 'left') {
					ths += 'padding-left:0px;';
				}
				ths += '"'; // end of th style
				ths += '>';
				var div = '<div style="';
				div += 'text-align: ' + cm.align + ';';
				cm.width = cm.width ? $.getGreaterNum(cm.width, opts.minwidth) : opts.minwidth;
				div += 'width: ' + cm.width + 'px;';
				div += 'overflow:hidden; text-overflow:ellipsis; white-space:nowrap;';
				div += '"'; // end of div style
				div += '> '; // end of div start tag
				var value = '';
				if (statistics && statistics[cm.dataIndex] !== undefined) {
					value = statistics[cm.dataIndex].value;
					var precision = statistics[cm.dataIndex].precision;
					if (precision > 0) {
						value = Number(value).toFixed(precision);	
					}
				}
				if (cm.countRenderer) {
					value = cm.countRenderer(value);
				}
				div += value + '</div>';
				
				ths += div + '</th>';
			}
			$thead.html('<tr>' + ths + '</tr>');
			$(table).html(thead);
			$statdiv.html(table);
		}
		
		/**
		 * 创建分页栏
		 */
		function buildPagerContainer() {
			pdiv.className = classNames.pagerContainerClass;
			var html = '';
			if (opts.usepager) {
				html += opts.showRpSelect ? createRecordsPerPageSelect() : '';
				html += '<div class="pbutton first" title="第一页"></div>';
				html += '<div class="pbutton prev" title="上一页"><span></span></div>';
				html += '<div class="group pcontrol">第 <input type="text" size="4" value="1"  title="当前页码"/> 页'
				html += opts.showTotal ? ('，共 ' + '<span id="' + totalPageInfoHolder + '">1</span> 页') : '';
				html += '</div>';
				html += '<div class="pbutton next" title="下一页"></div>';
				html +=  opts.showTotal ? ('<div class="pbutton last" title="最后一页"></div>'):'';
				html += '<div class="pbutton reload" title="重新加载"></div>';
				html += '<div class="group pageStat" title="记录信息"></div>';	
			}
			if (opts.statusBar) {
				html += '<div class="status-bar">' + (opts.statusBar || '') + '</div>';
			}
			pdiv.innerHTML = html;
			if (opts.usepager) {
				addPagerClickEvent(opts);
			}
		}
		function addPagerClickEvent() {
			$('.first', pdiv).click(function() {
				changePage('first');
			});	
			$('.prev', pdiv).click(function() {
				changePage('prev');
			});	
			$('.next', pdiv).click(function() {
				changePage('next');
			});	
			$('.last', pdiv).click(function() {
				changePage('last');
			});	
			$('.reload', pdiv).click(function() {
				changePage('reload');
			});	
			$('.pcontrol input', pdiv).keydown(function(e) {
				if(e.keyCode == 13) {
					changePage('input');
				}
			});
			$('select', pdiv).change(function () {
				if (opts.onRpChange && !opts.onRpChange(+this.value, placeholder)) {
					return;
				}
				opts.newp = 1;
				opts.rp = +this.value;
				tinygrid.populate(true);
			});
		}
		
		function createRecordsPerPageSelect() {
			var html = '<div class="group">';
			html += '<select id="' + rpSelectId + '" title="每页显示的记录数">';
			$.each(opts.rpOptions, function(i, rp) {
				html += '<option value="' + rp + '"';
				html += (rp == opts.rp) ? ' selected="selected"' : '';
				html += '>' + rp + '</option>';
			});
			html += '</select></div>';
			return html;
		}
		
		function changePage(mode) {
			if (opts._loading) {
				return true;
			}
			if ((mode == 'first' || mode == 'prev') && opts.page == 1) {
				return true; 
			}
			if ((mode == 'last' || mode == 'next') && opts.page == opts._pages) {
				return true; 
			}
			switch (mode) {
				case 'first' :
					opts.newp = 1;
					break;
				case 'prev' :
					if (opts.page > 1) {
						opts.newp = parseInt(opts.page) - 1;
					}
					break;
				case 'next' :
					if (opts.page < opts._pages) {
						opts.newp = parseInt(opts.page) + 1;
					}
					break;
				case 'last' :
					opts.newp = opts._pages;
					break;
				case 'input' :
					var nv = parseInt($('.pcontrol input', pdiv).val());
					if (isNaN(nv)) {
						nv = 1;
					}
					if (nv < 1) {
						nv = 1;
					} else if (nv > opts._pages) {
						nv = opts._pages;
					}
					$('.pcontrol input', this.pDiv).val(nv);
					opts.newp = nv;
					break;
			}
			if (opts.onChangePage) {
				opts.onChangePage(opts.newp, placeholder);
			}
			tinygrid.populate();
		}
	
		function addTableContainerScrollEvent() {
			$(bdiv).scroll(tableContainerScroll);
		}
		
		/**
		 * 表格区域水平滚动事件
		 */
		function tableContainerScroll() {
			thdiv.scrollLeft = bdiv.scrollLeft;
			if (opts._existsStatistics) {
				statdiv.scrollLeft = bdiv.scrollLeft;
			}
		}
	}; // end of addTinygrid
	
	// ----------------------------------------------------------------------------
	//-----------------------------扩展的插件方法----------------------------
	//----------------------------------------------------------------------------	
	var docloaded = false; // 确保HTML加载完毕

	$(document).ready(function() {docloaded = true} );
	
	/**
	 * 该插件的主方法
	 */
	$.fn.tinygrid = function(options) {
		return this.each(function() {
			if (!docloaded) {
				$(this).hide();
				var t = this;
				$(document).ready(function() {
					$.addTinygrid(this, options);
				});
			} else {
				$.addTinygrid(this, options);
			}
		});
	};
	/**
	 * function to reload tinygrid
	 */
	$.fn.gridReload = function(options) { 
		return this.each( function() {
			if (this.tinygrid && this.opts.url) {
				this.tinygrid.populate();
			}
		});
	}; //end gridReload

	/**
	 * function to update general options
	 */
	$.fn.gridOptions = function(options) { 
		return this.each( function() {
			if (this.tinygrid) {
				$.extend(this.opts, options);
			}
		});
	}; //end gridOptions
	
	$.fn.noSelect = function(p) { //no select plugin from flexigrid, by Paulo P. Marinas
		var prevent = null;
		if (p == null) {
			prevent = true;
		} else {
			prevent = p;
		}
		if (prevent) {
			return this.each(function() {
				if ($.browser.msie||$.browser.safari) {
					$(this).bind('selectstart', function(){return false;});
				} else if ($.browser.mozilla) {
					$(this).css('MozUserSelect','none');
					$('body').trigger('focus');
				} else if ($.browser.opera) {
					$(this).bind('mousedown',function(){return false;});
				} else {
					$(this).attr('unselectable','on');
				}
			});		
		} else {
			return this.each(function() {
				if ($.browser.msie||$.browser.safari) {
					$(this).unbind('selectstart');
				} else if ($.browser.mozilla) {
					$(this).css('MozUserSelect','inherit');
				} else if ($.browser.opera) {
					$(this).unbind('mousedown');
				} else {
					$(this).removeAttr('unselectable','on');
				}
			});
		}
	}; //end noSelect
	
})(jQuery);
