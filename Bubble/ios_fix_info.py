import xml.etree.cElementTree as etree

def xstr(s):
	if s == None:
		return 'None'
		
	return str(s)

file_data = open('platforms/ios/Anaren Atmosphere/Anaren Atmosphere-Info.plist', 'r').read()

plist = etree.fromstring(file_data)

next_is_bundle_display_name = False
next_is_orientations = False

for x in plist[0]:
	if next_is_bundle_display_name:
		if x.tag == 'string':
		    x.text = 'Atmosphere'
		
		next_is_bundle_display_name = False
	
	if next_is_orientations:
		if x.tag == 'array':
			removing = []
		
			for y in x:
				removing.append(y)
				#x.remove(y)
				#print('Removing:' + xstr(y.tag) + ':' + xstr(y.text))
			
			for y in removing:
				x.remove(y)
				#print('Removing:' + xstr(y.tag) + ':' + xstr(y.text))
			
			e = etree.Element('string')
			e.text = 'UIInterfaceOrientationPortrait'
			
			x.append(e)
			
			e = etree.Element('string')
			e.text = 'UIInterfaceOrientationPortraitUpsideDown'
			
			x.append(e)
						
		next_is_orientations = False
	
	if x.tag == 'key' and x.text == 'CFBundleDisplayName':
		next_is_bundle_display_name = True
	
	if x.text == 'UISupportedInterfaceOrientations':
		next_is_orientations = True
		
	if x.text == 'UISupportedInterfaceOrientations~ipad':
		next_is_orientations = True
		
	#print(xstr(x.tag) + ':' + xstr(x.text))
	
output_data = etree.tostring(plist)

open('platforms/ios/Anaren Atmosphere/Anaren Atmosphere-Info.plist', 'w').write(output_data)