# Copyright (c) 2024, Rijosh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Conversation(Document):
	def before_validate(self):
		user = frappe.get_user().doc.full_name
		self.user = user
	pass
