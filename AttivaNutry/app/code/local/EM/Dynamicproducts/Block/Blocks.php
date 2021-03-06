<?php
class EM_Dynamicproducts_Block_Blocks extends Mage_Adminhtml_Block_Widget_Grid
{
	public function __construct($arguments=array())
	{
		parent::__construct($arguments);
		$this->setDefaultSort('block_identifier');
		$this->setDefaultDir('ASC');
		$this->setUseAjax(true);
		$this->setDefaultFilter(array('chooser_is_active' => '1'));
	}

	/**
	 * Prepare chooser element HTML
	 *
	 * @param Varien_Data_Form_Element_Abstract $element Form Element
	 * @return Varien_Data_Form_Element_Abstract
	 */
	public function prepareElementHtml(Varien_Data_Form_Element_Abstract $element)
	{
		$uniqId = Mage::helper('core')->uniqHash($element->getId());
		$sourceUrl = $this->getUrl('*/cms_block_widget/chooser', array('uniq_id' => $uniqId));

		$chooser = $this->getLayout()->createBlock('widget/adminhtml_widget_chooser')
		->setElement($element)
		->setTranslationHelper($this->getTranslationHelper())
		->setConfig($this->getConfig())
		->setFieldsetId($this->getFieldsetId())
		->setSourceUrl($sourceUrl)
		->setUniqId($uniqId);


		if ($element->getValue()) {
			$block = Mage::getModel('cms/block')->load($element->getValue());
			if ($block->getId()) {
				$chooser->setLabel($block->getTitle());
			}
		}

		$element->setData('after_element_html', $chooser->toHtml());
		return $element;
	}

	/**
	 * Grid Row JS Callback
	 *
	 * @return string
	 */
	public function getRowClickCallback()
	{
		$chooserJsObject = $this->getId();
		$js = '
            function (grid, event) {
                var trElement = Event.findElement(event, "tr");
                var blockId = trElement.down("td").innerHTML.replace(/^\s+|\s+$/g,"");
                var blockTitle = trElement.down("td").next().innerHTML;
                '.$chooserJsObject.'.setElementValue(blockId);
                '.$chooserJsObject.'.setElementLabel(blockTitle);
                '.$chooserJsObject.'.close();
            }
        ';
		return $js;
	}

	/**
	 * Prepare Cms static blocks collection
	 *
	 * @return Mage_Adminhtml_Block_Widget_Grid
	 */
	protected function _prepareCollection()
	{
		$collection = Mage::getModel('cms/block')->getCollection();
		/* @var $collection Mage_Cms_Model_Mysql4_Block_Collection */
		$this->setCollection($collection);
		return parent::_prepareCollection();
	}

	/**
	 * Prepare columns for Cms blocks grid
	 *
	 * @return Mage_Adminhtml_Block_Widget_Grid
	 */
	protected function _prepareColumns()
	{
		$this->addColumn('chooser_id', array(
            'header'    => Mage::helper('cms')->__('ID'),
            'align'     => 'right',
            'index'     => 'block_id',
            'width'     => 50
		));

		$this->addColumn('chooser_title', array(
            'header'    => Mage::helper('cms')->__('Title'),
            'align'     => 'left',
            'index'     => 'title',
		));

		$this->addColumn('chooser_identifier', array(
            'header'    => Mage::helper('cms')->__('Identifier'),
            'align'     => 'left',
            'index'     => 'identifier'
            ));


            $this->addColumn('chooser_is_active', array(
            'header'    => Mage::helper('cms')->__('Status'),
            'index'     => 'is_active',
            'type'      => 'options',
            'options'   => array(
            0 => Mage::helper('cms')->__('Disabled'),
            1 => Mage::helper('cms')->__('Enabled')
            ),
            ));

            return parent::_prepareColumns();
	}

	public function getGridUrl()
	{
		return $this->getUrl('*/cms_block_widget/chooser', array('_current' => true));

	}
}