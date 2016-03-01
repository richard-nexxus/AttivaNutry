<?php
class Gala_Rainbowsettings_Model_Config_Sidebar_Shopby
{
	/**
     * Options getter
     *
     * @return array
     */
    public function toOptionArray()
    {
        return array(
            array('value' => 'left', 'label'=>Mage::helper('adminhtml')->__('Left')),
            array('value' => 'right', 'label'=>Mage::helper('adminhtml')->__('Right')),
        );
    }
}
?>